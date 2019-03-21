import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer } from "../../generated/prisma-client";
import { OfferPosition } from "../../models";
import { calcScoreSuggestion } from "../../utils/calcScore";

interface OffersQueries {
  offer: QueryResolvers.OfferResolver;
  offerAddons: QueryResolvers.OfferAddonsResolver;
  suggestions: QueryResolvers.SuggestionsResolver;
}

export const offers: OffersQueries = {
  async offer(parent, { id }, ctx: Context) {
    const userID = ctx.request.userId;
    if (userID) {
      await ctx.prisma.deleteManyNotifications({
        owner: {
          id: userID
        },
        objectID: id
      });
    }
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
        offer: offers[i],
        score: score,
        position: null,
        total_length: null
      };

      offersScore.push(offer_score);
    }
    offers_score.sort((a, b) => (a.score > b.score ? 1 : -1));
    for (let i = 0; i < offers_score.length; i++) {
      offers_score[i].position = i;
      offers_score[i].total_length = offers_score.length;
    }

    offersScore.sort((a, b) => (a.score > b.score ? 1 : -1));
    offersScore.forEach((offerScore, i: number) => {
      offerScore.position = i;
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
  }
};
