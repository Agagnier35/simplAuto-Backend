import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Float } from "../../generated/prisma-client";

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

  suggestions(parent, { id }, ctx: Context) {
    const weight = {
      price: 50,
      manufacturer: 7,
      model: 7,
      category: 14,
      mileage: 14,
      year: 8
    };

    type offer_score = {
      offer: Offer;
      score: Float;
      position: number;
    };

    const max_deviation = 0.4;
    return ctx.prisma.offers();
  }
};
