import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Car, Ad } from "../../generated/prisma-client";
import { OfferPosition } from "../../models";

function calc_score(
  offerCar: Car,
  offer: Offer,
  ad: Ad,
  SameManufacturer: Boolean,
  SameModel: Boolean,
  SameCategory: Boolean
) {
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
  SameManufacturer ? (total_score += weight.manufacturer) : (total_score += 0);

  // model
  SameModel ? (total_score += weight.model) : (total_score += 0);

  //Category
  SameCategory ? (total_score += weight.category) : (total_score += 0);

  //mileage

  if (offerCar.mileage < ad.mileageLowerBound) {
    const minimum = ad.mileageLowerBound * (1 - max_deviation);
    const gap_ad_minimum = ad.mileageLowerBound - minimum;
    const gap_offer_minimum = offerCar.mileage - minimum;
    const perc_score = gap_offer_minimum / gap_ad_minimum;
    const weight_score = weight.price * perc_score;

    if (weight_score < 0) {
      total_score += 0;
    } else {
      total_score += weight_score;
    }
  } else if (offerCar.mileage > ad.mileageHigherBound) {
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
    total_score += weight.mileage;
  }

  //year
  if (
    offerCar.year > ad.yearLowerBound - 1 &&
    offerCar.year < ad.yearHigherBound + 1
  ) {
    total_score += weight.year;
  } else {
    total_score += 0;
  }

  return total_score;
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
      const offerCarManufacturer = await ctx.prisma
        .offer({ id: element.id })
        .car()
        .manufacturer();

      const offerCarModel = await ctx.prisma
        .offer({ id: element.id })
        .car()
        .model();

      const offerCarCategory = await ctx.prisma
        .offer({ id: element.id })
        .car()
        .category();

      const adManufacturer = await ctx.prisma.ad({ id }).manufacturer();
      const adModel = await ctx.prisma.ad({ id }).model();
      const adCategory = await ctx.prisma.ad({ id }).category();

      let SameManufacturer = null;
      let SameModel = null;
      let SameCategory = null;

      offerCarManufacturer.id === adManufacturer.id
        ? (SameManufacturer = true)
        : (SameManufacturer = false);

      offerCarModel.id === adModel.id
        ? (SameModel = true)
        : (SameModel = false);

      offerCarCategory.id === adCategory.id
        ? (SameCategory = true)
        : (SameCategory = false);

      const score = calc_score(
        offerCar,
        element,
        parent,
        SameManufacturer,
        SameModel,
        SameCategory
      );

      const offer_score: OfferPosition = {
        offer: element,
        score: score,
        position: null
      };

      offers_score.push(offer_score);
    });

    offers_score.sort((a, b) => (a.score > b.color ? 1 : -1));
    for (let i = 0; i < offers_score.length; i++) {
      offers_score[i].position = i;
    }

    return offers_score;
  }
};
