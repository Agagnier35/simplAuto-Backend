import { Context, getUserId } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { OfferPosition, Statistics } from "../../models";
import { calcScoreSuggestion } from "../../utils/calcScore";
import { fetchOfferStatsFromAPI } from "../../utils/apiGateway";
import moment from "moment";
import { Offer } from "../../generated/prisma-client";

interface OffersQueries {
  offer: QueryResolvers.OfferResolver;
  offerAddons: QueryResolvers.OfferAddonsResolver;
  suggestions: QueryResolvers.SuggestionsResolver;
  statsForOffer: QueryResolvers.StatsForAdsResolver;
}

export const offers: OffersQueries = {
  async offer(parent, { id }, ctx: Context) {
    return ctx.prisma.offer({ id });
  },

  offerAddons(parent, args, ctx: Context) {
    return ctx.prisma.offerAddons({
      where: {
        rankValue_gt: 0
      }
    });
  },
  async suggestions(parent, { id, pageNumber, pageSize }, ctx: Context) {
    const offers = await ctx.prisma.ad({ id }).offers();
    const ad = await ctx.prisma.ad({ id });
    let offersScore = [];

    const adManufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const adModel = await ctx.prisma.ad({ id }).model();
    const adCategory = await ctx.prisma.ad({ id }).category();

    for (const offer of offers) {
      const { id } = offer;
      const offerCar = await ctx.prisma.offer({ id }).car();
      const offerCarManufacturer = await ctx.prisma
        .offer({ id })
        .car()
        .manufacturer();

      const offerCarModel = await ctx.prisma
        .offer({ id })
        .car()
        .model();

      const offerCarCategory = await ctx.prisma
        .offer({ id })
        .car()
        .category();

      let sameManufacturer = null;
      let sameModel = null;
      let sameCategory = null;

      if (adManufacturer && offerCarManufacturer) {
        sameManufacturer = offerCarManufacturer.id === adManufacturer.id;
      }

      if (adModel && offerCarModel) {
        sameModel = offerCarModel.id === adModel.id;
      }

      if (adCategory && offerCarCategory) {
        sameCategory = offerCarCategory.id === adCategory.id;
      }

      const score = calcScoreSuggestion(
        offerCar,
        offer,
        ad,
        sameManufacturer,
        sameModel,
        sameCategory
      );

      const offer_score: OfferPosition = {
        offer,
        score,
        position: null,
        totalLength: null
      };
      if (offer_score.score < 100 && offer_score.score >= 75) {
        offersScore.push(offer_score);
      }
    }

    offersScore.sort((a, b) => (a.score > b.score ? 1 : -1));
    offersScore.forEach((offerScore, i: number) => {
      offerScore.position = i;
      offerScore.totalLength = offersScore.length;
    });

    if (pageSize && pageNumber >= 0) {
      if (pageNumber === 0) {
        offersScore = offersScore.slice(0, pageSize);
      } else {
        offersScore = offersScore.slice(
          pageNumber * pageSize - 1,
          pageSize * pageNumber + pageSize
        );
      }
    }

    return offersScore;
  },
  async statsForOffer(parent, { id }, ctx: Context, info) {
    const car = await ctx.prisma.offer({ id }).car();
    const manufacturer = await ctx.prisma
      .offer({ id })
      .car()
      .manufacturer();
    const model = await ctx.prisma
      .offer({ id })
      .car()
      .model();
    const category = await ctx.prisma
      .offer({ id })
      .car()
      .category();

    const userID = getUserId(ctx);
    const user = await ctx.prisma.user({ id: userID });

    const allOffersThatMatchesCar: Offer[] = await ctx.prisma.offers({
      where: {
        car: {
          manufacturer: { id: manufacturer.id },
          model: { id: model.id },
          category: { id: category.id },
          year: car.year
        }
      }
    });

    const statsAPI = await fetchOfferStatsFromAPI(car, user, ctx);

    const statsObject: Statistics = {
      averagePriceAPI: statsAPI.averagePriceAPI,
      averageTimeOnMarketAPI: statsAPI.averageTimeOnMarketAPI,
      averageTimeOnMarketApp: 0,
      averagePriceApp: 0
    };

    if (allOffersThatMatchesCar && allOffersThatMatchesCar.length > 0) {
      for (const offer of allOffersThatMatchesCar) {
        const beginningDate = moment(offer.createdAt);
        statsObject.averageTimeOnMarketApp +=
          offer.status !== "PUBLISHED"
            ? moment
                .duration(moment(offer.updatedAt).diff(beginningDate))
                .asDays()
            : 0;
        statsObject.averagePriceApp += offer.price;
      }
      statsObject.averageTimeOnMarketApp /= allOffersThatMatchesCar.length;
      statsObject.averagePriceApp /= allOffersThatMatchesCar.length;
    }

    return statsObject;
  }
};
