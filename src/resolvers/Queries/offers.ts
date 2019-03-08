import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Float } from "../../generated/prisma-client";

function calc_score(weight, car) {}

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

    const offers = await ctx.prisma.ad({ id }).offers();
    let offers_score = [];

    offers.forEach(async element => {
      const offerCar = await ctx.prisma.offer({ id: element.id }).car();
      let score = calc_score(weight, offerCar);
      offers_score.push();
    });

    return offers_score;
  }
};
