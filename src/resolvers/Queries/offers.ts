import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Float, Car, Ad } from "../../generated/prisma-client";
import { OfferPosition } from "../../models";

function calc_score(offerCar: Car, offer: Offer, ad: Ad) {
  const weight = {
    price: 50,
    manufacturer: 7,
    model: 7,
    category: 14,
    mileage: 14,
    year: 8
  };

  const max_deviation = 0.2;

  let total_score = 0;

  //price
  if (offer.price < ad.priceLowerBound) {
    const minimum = ad.priceLowerBound * (1 - max_deviation);
    const gap_ad_minimum = ad.priceLowerBound - minimum;
    const gap_offer_minimum = offer.price - minimum;
    const perc_score = gap_offer_minimum / gap_ad_minimum;
    const weight_score = weight.price * perc_score;

    if (weight_score < 0) {
      total_score += 0;
    } else {
      total_score += weight_score;
    }
  } else if (offer.price > ad.priceHigherBound) {
    const maximum = ad.priceHigherBound * (1 + max_deviation);
    const gap_ad_maximum = maximum - ad.priceHigherBound;
    const gap_offer_maximum = maximum - offer.price;
    const perc_score = gap_offer_maximum / gap_ad_maximum;
    const weight_score = weight.price * perc_score;

    if (weight_score < 0) {
      total_score += 0;
    } else {
      total_score += weight_score;
    }
  } else {
    total_score += weight.price;
  }

  // manufacturer

  return;
}

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
    let offers_score = [];

    offers.forEach(async element => {
      const offerCar = await ctx.prisma.offer({ id: element.id }).car();
      const score = calc_score(offerCar, element, parent);

      const offer_score: OfferPosition = {
        offer: element,
        score: { score },
        position: null
      };

      offers_score.push(offer_score);
    });

    return offers_score;
  }
};
