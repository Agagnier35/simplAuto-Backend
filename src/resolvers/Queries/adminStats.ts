import { QueryResolvers } from "../../generated/yoga-client";
import { Context, getUserId } from "../../utils";
import { fetchAllStatsFromAPI } from "../../utils/apiGateway";
import {
  Location,
  OfferWhereInput,
  Offer,
  User,
  Manufacturer,
  CarModel
} from "../../generated/prisma-client";
import moment = require("moment");
import { AdminCarResearchStatistics, Top10Car } from "../../models";

interface AdminStatsQueries {
  adminStats: QueryResolvers.AdminStatsResolver;
  adminStatisticsCar: QueryResolvers.AdminStatisticsCarResolver;
}

const findAndReplaceIntoArray = (
  array: {
    makeModel: Top10Car[];
    sellers: { seller: User; count: number }[];
  } = { makeModel: [], sellers: [] },
  soldMake: Manufacturer,
  soldModel: CarModel,
  sold: Offer,
  seller: User
) => {
  const dom = moment
    .duration(moment(sold.updatedAt).diff(moment(sold.createdAt)))
    .asDays();

  if (
    array.makeModel.filter(
      car => car.make.id === soldMake.id && car.model.id === soldModel.id
    ).length === 0
  ) {
    array.makeModel.push({
      make: soldMake,
      model: soldModel,
      averagePrice: sold.price,
      count: 1,
      averageTime: dom
    });
  } else {
    const previous = array.makeModel.filter(
      car => car.make.id === soldMake.id && car.model.id === soldModel.id
    )[0];
    array.makeModel = array.makeModel.filter(
      car => !(car.make.id === soldMake.id && car.model.id === soldModel.id)
    );
    array.makeModel.push({
      make: soldMake,
      model: soldModel,
      averagePrice: previous.averagePrice + sold.price,
      count: previous.count + 1,
      averageTime: previous.averageTime + dom
    });
  }

  if (array.sellers.filter(u => u.seller.id === seller.id).length === 0) {
    array.sellers.push({ seller, count: 0 });
  } else {
    const previous = array.sellers.filter(u => u.seller.id === seller.id)[0];
    array.sellers = array.sellers.filter(u => !(u.seller.id === seller.id));
    array.sellers.push({ seller, count: previous.count + 1 });
  }
};

const mapOffers = async (soldOffers: Offer[], ctx: Context) => {
  const groupedOffers: {
    makeModel: Top10Car[];
    sellers: { seller: User; count: number }[];
  } = { makeModel: [], sellers: [] };

  for (const sold of soldOffers) {
    const soldCar = await ctx.prisma.offer({ id: sold.id }).car();
    const soldMake = await ctx.prisma.car({ id: soldCar.id }).manufacturer();
    const soldModel = await ctx.prisma.car({ id: soldCar.id }).model();
    const seller = await ctx.prisma.car({ id: soldCar.id }).owner();

    findAndReplaceIntoArray(groupedOffers, soldMake, soldModel, sold, seller);
  }

  groupedOffers.makeModel.map(car => {
    car.averagePrice /= car.count;
    car.averageTime /= car.count;
  });
  return groupedOffers;
};

export const adminStatistics: AdminStatsQueries = {
  async adminStats(parent, args, ctx: Context) {
    const soldOffers = await ctx.prisma.offers({
      where: { status: "ACCEPTED" }
    });

    const groupedOffers: {
      makeModel: Top10Car[];
      sellers: { seller: User; count: number }[];
    } = await mapOffers(soldOffers, ctx);

    const top10MostSoldMakeModel: Top10Car[] = groupedOffers.makeModel
      .sort((a, b) => (a.count > b.count ? -1 : 1))
      .slice(0, 10);
    const top10FastestSold: Top10Car[] = groupedOffers.makeModel
      .sort((a, b) => (a.averageTime > b.averageTime ? -1 : 1))
      .slice(0, 10);
    const bestSeller1 = groupedOffers.sellers
      .sort((a, b) => (a.count > b.count ? -1 : 1))
      .shift();

    const bestSeller: User = bestSeller1 ? bestSeller1.seller : undefined;
    const bestSellersCars = bestSeller
      ? await ctx.prisma.offers({
          where: { status: "ACCEPTED", creator: { id: bestSeller.id } }
        })
      : [];

    const bestSellerTop10CarsPromise = await mapOffers(bestSellersCars, ctx);
    const bestSellerTop10Cars = bestSellerTop10CarsPromise.makeModel
      .sort((a, b) => (a.count > b.count ? -1 : 1))
      .slice(0, 10);

    let activeUsersCount = 0;
    let inactiveUsersCount = 0;
    const users = await ctx.prisma.users();
    for (const user of users) {
      const adUser = await ctx.prisma
        .adsConnection({ where: { creator: { id: user.id } } })
        .aggregate()
        .count();
      const carUser = await ctx.prisma
        .carsConnection({ where: { owner: { id: user.id } } })
        .aggregate()
        .count();
      adUser > 0 || carUser > 0
        ? (activeUsersCount += 1)
        : (inactiveUsersCount += 1);
    }

    return {
      activeUsersCount,
      inactiveUsersCount,
      top10MostSoldMakeModel,
      top10FastestSold,
      bestSeller,
      bestSellerTop10Cars,
      allVehiculesCount: await ctx.prisma
        .carsConnection()
        .aggregate()
        .count(),
      allAdsCount: await ctx.prisma
        .adsConnection()
        .aggregate()
        .count()
    };
  },

  async adminStatisticsCar(parent, { data }, ctx: Context) {
    const { manufacturerID, modelID, year, location, radius } = data;
    if (!manufacturerID && !modelID && !year) {
      return undefined;
    }
    const manufacturer = await ctx.prisma.manufacturer({ id: manufacturerID });
    const model = await ctx.prisma.carModel({ id: modelID });

    const response: any = await fetchAllStatsFromAPI(
      manufacturer,
      model,
      year,
      location as Location,
      radius
    );

    const stats: AdminCarResearchStatistics = {
      averagePriceAPI: response.averagePriceAPI,
      averageTimeOnMarketAPI: response.averageTimeOnMarketAPI,
      lowestPriceSoldAPI: response.lowestPriceSoldAPI,
      highestPriceSoldAPI: response.highestPriceSoldAPI,
      lowestTimeOnMarketAPI: response.lowestTimeOnMarketAPI,
      highestTimeOnMarketAPI: response.highestTimeOnMarketAPI,
      soldOnApp: 0,
      averagePriceApp: 0,
      averageTimeOnMarketApp: 0,
      lowestPriceSoldApp: 0,
      highestPriceSoldApp: 0,
      lowestTimeOnMarketApp: 0,
      highestTimeOnMarketApp: 0
    };

    const where: OfferWhereInput = { status: "ACCEPTED", car: {} };
    if (manufacturer) {
      where.car.manufacturer = { id: manufacturer.id };
    }
    if (model) {
      where.car.model = { id: model.id };
    }
    if (year) {
      where.car.year = year;
    }

    const offers: Offer[] = await ctx.prisma.offers({ where });
    stats.soldOnApp = offers.length;

    if (offers && offers.length > 0) {
      let sumPrice = 0;
      let sumDom = 0;

      offers.forEach(o => {
        if (
          stats.lowestPriceSoldApp === 0 ||
          stats.lowestPriceSoldApp >= o.price
        ) {
          stats.lowestPriceSoldApp = o.price;
        }
        if (stats.highestPriceSoldApp <= o.price) {
          stats.highestPriceSoldApp = o.price;
        }
        sumPrice += o.price;

        const dom = moment
          .duration(moment(o.updatedAt).diff(moment(o.createdAt)))
          .asDays();
        if (
          stats.lowestTimeOnMarketApp === 0 ||
          stats.lowestTimeOnMarketApp >= dom
        ) {
          stats.lowestTimeOnMarketApp = dom;
        }
        if (stats.highestTimeOnMarketApp <= dom) {
          stats.highestTimeOnMarketApp = dom;
        }
        sumDom += dom;
      });

      stats.averagePriceApp = sumPrice / offers.length;
      stats.averageTimeOnMarketApp = sumDom / offers.length;
    }

    return stats;
  }
};
