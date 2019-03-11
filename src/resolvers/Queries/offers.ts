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
  offer(parent, { id }, ctx: Context) {
    return ctx.prisma.offer({ id });
  },

  offerAddons(parent, args, ctx: Context) {
    return ctx.prisma.offerAddons({
      where: {
        rankValue_gt: 0
      }
    });
  },
  async suggestions(parent, { id }, ctx: Context) {
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
        position: null
      };

      offers_score.push(offer_score);
    }
    offers_score.sort((a, b) => (a.score > b.score ? 1 : -1));
    for (let i = 0; i < offers_score.length; i++) {
      offers_score[i].position = i;
    }

    return offers_score;
  }
};
