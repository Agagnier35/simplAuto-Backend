import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Car, Ad } from "../../generated/prisma-client";
import { OfferPosition } from "../../models";
import { calc_score_suggestion } from "../../utils/calc_score";

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
    let offers_score = [];

    const adManufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const adModel = await ctx.prisma.ad({ id }).model();
    const adCategory = await ctx.prisma.ad({ id }).category();

    for (let i = 0; i < offers.length; i++) {
      const offerCar = await ctx.prisma.offer({ id: offers[i].id }).car();
      const offerCarManufacturer = await ctx.prisma
        .offer({ id: offers[i].id })
        .car()
        .manufacturer();

      const offerCarModel = await ctx.prisma
        .offer({ id: offers[i].id })
        .car()
        .model();

      const offerCarCategory = await ctx.prisma
        .offer({ id: offers[i].id })
        .car()
        .category();

      let SameManufacturer = null;
      let SameModel = null;
      let SameCategory = null;

      adManufacturer && offerCarManufacturer
        ? offerCarManufacturer.id === adManufacturer.id
          ? (SameManufacturer = true)
          : (SameManufacturer = false)
        : null;

      adModel && offerCarModel
        ? offerCarModel.id === adModel.id
          ? (SameModel = true)
          : (SameModel = false)
        : null;

      adCategory && offerCarCategory
        ? offerCarCategory.id === adCategory.id
          ? (SameCategory = true)
          : (SameCategory = false)
        : null;

      const score = calc_score_suggestion(
        offerCar,
        offers[i],
        ad,
        SameManufacturer,
        SameModel,
        SameCategory
      );

      const offer_score: OfferPosition = {
        offer: offers[i],
        score: score,
        position: null,
        total_length: null
      };

      offers_score.push(offer_score);
    }
    offers_score.sort((a, b) => (a.score > b.score ? 1 : -1));
    for (let i = 0; i < offers_score.length; i++) {
      offers_score[i].position = i;
      offers_score[i].total_length = offers_score.length;
    }

    if (pageSize && pageNumber >= 0) {
      if (pageNumber === 0) {
        offers_score = offers_score.slice(0, pageSize);
      } else {
        offers_score = offers_score.slice(
          pageNumber * pageSize - 1,
          pageSize * pageNumber + pageSize
        );
      }
    }

    return offers_score;
  }
};
