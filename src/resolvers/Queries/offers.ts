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

  const max_deviation = 0.3;

  let total_score = 0;
  let max_score = 0;

  //price
  if (ad.priceLowerBound != null && ad.priceHigherBound != null) {
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
    max_score += weight.price;
  }

  // manufacturer
  if (SameManufacturer != null) {
    SameManufacturer
      ? (total_score += weight.manufacturer)
      : (total_score += 0);

    max_score += weight.manufacturer;
  }
  // model
  if (SameModel != null) {
    SameModel ? (total_score += weight.model) : (total_score += 0);
    max_score += weight.model;
  }
  //Category
  if (SameCategory != null) {
    SameCategory ? (total_score += weight.category) : (total_score += 0);
    max_score += weight.category;
  }
  //mileage

  if (ad.mileageHigherBound != null && ad.mileageLowerBound != null) {
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
      const maximum = ad.mileageHigherBound * (1 + max_deviation);
      const gap_ad_maximum = maximum - ad.mileageHigherBound;
      const gap_offer_maximum = maximum - offerCar.mileage;
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
    max_score += weight.mileage;
  }

  //year
  if (ad.yearHigherBound != null && ad.yearLowerBound != null) {
    if (
      offerCar.year > ad.yearLowerBound - 1 &&
      offerCar.year < ad.yearHigherBound + 1
    ) {
      total_score += weight.year;
    } else {
      total_score += 0;
    }
    max_score += weight.year;
  }

  return (total_score / max_score) * 100;
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
  //parent is a Ad
  async suggestions(parent, { id }, ctx: Context) {
    const offers = await ctx.prisma.ad({ id }).offers();
    let offers_score = [];

    const adManufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const adModel = await ctx.prisma.ad({ id }).model();
    const adCategory = await ctx.prisma.ad({ id }).category();

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

      let SameManufacturer = null;
      let SameModel = null;
      let SameCategory = null;

      if (adManufacturer != null) {
        offerCarManufacturer.id === adManufacturer.id
          ? (SameManufacturer = true)
          : (SameManufacturer = false);
      }

      if (adModel != null) {
        offerCarModel.id === adModel.id
          ? (SameModel = true)
          : (SameModel = false);
      }

      if (adCategory != null) {
        offerCarCategory.id === adCategory.id
          ? (SameCategory = true)
          : (SameCategory = false);
      }

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

    offers_score.sort((a, b) => (a.score > b.score ? 1 : -1));
    for (let i = 0; i < offers_score.length; i++) {
      offers_score[i].position = i;
    }

    return offers_score;
  }
};
