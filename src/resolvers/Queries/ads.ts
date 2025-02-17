import { Context, getUserId } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { AdPosition, Statistics } from "../../models";
import { calcScoreAdSuggestion } from "../../utils/calcScore";
import { distanceFromCoordinate } from "../../utils/mathFunction";
import { fetchAdStatsFromAPI } from "../../utils/apiGateway";
import moment from "moment";
import { Offer, Ad, CarWhereInput } from "../../generated/prisma-client";
import { offers } from "./offers";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
  allAdsCount: QueryResolvers.AllAdsCountResolver;
  adSuggestion: QueryResolvers.AdSuggestionResolver;
  statsForAds: QueryResolvers.StatsForAdsResolver;
  homePageAds: QueryResolvers.HomePageAdsResolver;
}

export const ads: AdsQueries = {
  ads(parent, { pageNumber, pageSize }, ctx: Context) {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.ads(resolverArg);
  },
  async homePageAds(parent, args, ctx: Context) {
    const allAds = await ctx.prisma.ads({
      where: {
        status: "PUBLISHED"
      }
    });
    const adRequire = 5;

    if (allAds.length < adRequire) {
      return allAds;
    }

    const adsNb = allAds.length;
    const startIndex = Math.floor(Math.random() * (adsNb - adRequire));

    return [
      allAds[startIndex],
      allAds[startIndex + 1],
      allAds[startIndex + 2],
      allAds[startIndex + 3],
      allAds[startIndex + 4]
    ];
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },
  allAdsCount(parent, args, ctx: Context) {
    return ctx.prisma
      .adsConnection()
      .aggregate()
      .count();
  },

  async adSuggestion(parent, { id, pageNumber, pageSize }, ctx: Context) {
    const ads = await ctx.prisma.ads({ where: { status: "PUBLISHED" } });
    const car = await ctx.prisma.car({ id });
    const user = await ctx.prisma.car({ id }).owner();
    const userLocation = await ctx.prisma
      .car({ id })
      .owner()
      .location();
    const offersWithCar = await ctx.prisma.car({ id }).offers();
    let adsScore = [];

    const carManufacturer = await ctx.prisma.car({ id }).manufacturer();
    const carModel = await ctx.prisma.car({ id }).model();
    const carCategory = await ctx.prisma.car({ id }).category();

    for (const ad of ads) {
      const { id } = ad;
      const adCarManufacturer = await ctx.prisma.ad({ id }).manufacturer();

      const adCarModel = await ctx.prisma.ad({ id }).model();

      const adCarCategory = await ctx.prisma.ad({ id }).category();

      const adOwner = await ctx.prisma.ad({ id }).creator();
      const adOwnerLocation = await ctx.prisma
        .ad({ id })
        .creator()
        .location();

      let sameManufacturer = null;
      let sameModel = null;
      let sameCategory = null;

      if (adCarManufacturer && carManufacturer) {
        sameManufacturer = carManufacturer.id === adCarManufacturer.id;
      }

      if (adCarModel && carModel) {
        sameModel = carModel.id === adCarModel.id;
      }

      if (adCarCategory && carCategory) {
        sameCategory = carCategory.id === adCarCategory.id;
      }

      const score = calcScoreAdSuggestion(
        ad,
        car,
        sameManufacturer,
        sameModel,
        sameCategory
      );

      const ad_score: AdPosition = {
        score,
        ad,
        position: null,
        totalLength: null
      };

      let alreadyOffered = false;

      for (const offer of offersWithCar) {
        const adInOffer = await ctx.prisma.offer({ id: offer.id }).ad();
        if (ad.id === adInOffer.id) {
          alreadyOffered = true;
        }
      }

      const distance = distanceFromCoordinate(
        adOwnerLocation.longitude,
        adOwnerLocation.latitude,
        userLocation.longitude,
        userLocation.latitude
      );

      if (distance <= adOwner.radius && distance <= user.radius) {
        if (!alreadyOffered && user.id !== adOwner.id && ad_score.score >= 75) {
          adsScore.push(ad_score);
        }
      }
    }

    adsScore.sort((a, b) => (a.score > b.score ? -1 : 1));

    adsScore.sort(a => {
      const c = moment(Date.now());
      const b = new Date(a.ad.topExpiry);
      if (c.diff(b, "days") < 7) {
        return -1;
      }
      return 1;
    });

    adsScore.forEach((adScore, i: number) => {
      adScore.position = i;
      adScore.totalLength = adsScore.length;
    });

    if (pageSize && pageNumber >= 0) {
      if (pageNumber === 0) {
        adsScore = adsScore.slice(0, pageSize);
      } else {
        adsScore = adsScore.slice(
          pageNumber * pageSize - 1,
          pageSize * pageNumber + pageSize
        );
      }
    }

    return adsScore;
  },
  async statsForAds(parent, { id }, ctx: Context, info) {
    const ad = await ctx.prisma.ad({ id });
    const manufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const model = await ctx.prisma.ad({ id }).model();
    const category = await ctx.prisma.ad({ id }).category();

    const userID = getUserId(ctx);
    const user = await ctx.prisma.user({ id: userID });

    const car: CarWhereInput = {};
    if (ad.mileageLowerBound) {
      car.mileage_gte = ad.mileageLowerBound;
    }
    if (ad.mileageHigherBound) {
      car.mileage_lte = ad.mileageHigherBound;
    }
    if (ad.yearLowerBound) {
      car.year_gte = ad.yearLowerBound;
    }
    if (ad.mileageHigherBound) {
      car.year_lte = ad.yearHigherBound;
    }
    if (manufacturer) {
      car.manufacturer = { id: manufacturer.id };
    }
    if (model) {
      car.model = { id: model.id };
    }
    if (category) {
      car.category = { id: category.id };
    }

    const allOffersThatMatchesAd: Offer[] = await ctx.prisma.offers({
      where: {
        car
      }
    });

    const statsAPI = await fetchAdStatsFromAPI(ad, user, ctx);

    const statsObject: Statistics = {
      averagePriceAPI: statsAPI.averagePriceAPI,
      averageTimeOnMarketAPI: statsAPI.averageTimeOnMarketAPI,
      averageTimeOnMarketApp: 0,
      averagePriceApp: 0
    };

    if (allOffersThatMatchesAd && allOffersThatMatchesAd.length > 0) {
      for (const offer of allOffersThatMatchesAd) {
        const beginningDate = moment(offer.createdAt);
        statsObject.averageTimeOnMarketApp +=
          offer.status !== "PUBLISHED"
            ? moment
                .duration(moment(offer.updatedAt).diff(beginningDate))
                .asDays()
            : 0;

        statsObject.averagePriceApp += offer.price;
      }
      statsObject.averageTimeOnMarketApp /= allOffersThatMatchesAd.length;
      statsObject.averagePriceApp /= allOffersThatMatchesAd.length;
    }

    return statsObject;
  }
};
