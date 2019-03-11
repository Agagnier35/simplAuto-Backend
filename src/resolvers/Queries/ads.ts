import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Car, Ad } from "../../generated/prisma-client";
import { AdPosition } from "../../models";

function calc_score(
  ad: Ad,
  yourCar: Car,
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
    if (yourCar.mileage < ad.mileageLowerBound) {
      const minimum = ad.mileageLowerBound * (1 - max_deviation);
      const gap_ad_minimum = ad.mileageLowerBound - minimum;
      const gap_yourCar_minimum = yourCar.mileage - minimum;
      const perc_score = gap_yourCar_minimum / gap_ad_minimum;
      const weight_score = weight.price * perc_score;

      if (weight_score < 0) {
        total_score += 0;
      } else {
        total_score += weight_score;
      }
    } else if (yourCar.mileage > ad.mileageHigherBound) {
      const maximum = ad.mileageHigherBound * (1 + max_deviation);
      const gap_ad_maximum = maximum - ad.mileageHigherBound;
      const gap_yourCar_maximum = maximum - yourCar.mileage;
      const perc_score = gap_yourCar_maximum / gap_ad_maximum;
      const weight_score = weight.mileage * perc_score;

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
      yourCar.year > ad.yearLowerBound - 1 &&
      yourCar.year < ad.yearHigherBound + 1
    ) {
      total_score += weight.year;
    } else {
      total_score += 0;
    }
    max_score += weight.year;
  }

  return Math.floor((total_score / max_score) * 100);
}

interface OffersQueries {
  offer: QueryResolvers.OfferResolver;
  offerAddons: QueryResolvers.OfferAddonsResolver;
  suggestions: QueryResolvers.SuggestionsResolver;
}
interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
  adSuggestion: QueryResolvers.AdSuggestionResolver;
}

export const ads: AdsQueries = {
  ads(parent, args, ctx: Context) {
    return ctx.prisma.ads({
      where: {
        status: "PUBLISHED"
      }
    });
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },
  //id of Car
  async adSuggestion(parent, { id }, ctx: Context) {
    const ads = await ctx.prisma.ads();
    const car = await ctx.prisma.car({ id });
    let ads_score = [];

    const CarManufacturer = await ctx.prisma.car({ id }).manufacturer();
    const CarModel = await ctx.prisma.car({ id }).model();
    const CarCategory = await ctx.prisma.car({ id }).category();

    for (let i = 0; i < ads.length; i++) {
      const adCarManufacturer = await ctx.prisma
        .ad({ id: ads[i].id })
        .manufacturer();

      const adCarModel = await ctx.prisma.ad({ id: ads[i].id }).model();

      const adCarCategory = await ctx.prisma.ad({ id: ads[i].id }).category();

      let SameManufacturer = null;
      let SameModel = null;
      let SameCategory = null;

      if (adCarManufacturer != null) {
        CarManufacturer.id === adCarManufacturer.id
          ? (SameManufacturer = true)
          : (SameManufacturer = false);
      }

      if (adCarModel != null) {
        CarModel.id === adCarModel.id
          ? (SameModel = true)
          : (SameModel = false);
      }

      if (adCarCategory != null) {
        CarCategory.id === adCarCategory.id
          ? (SameCategory = true)
          : (SameCategory = false);
      }

      const score = calc_score(
        ads[i],
        car,
        SameManufacturer,
        SameModel,
        SameCategory
      );

      const ad_score: AdPosition = {
        ad: ads[i],
        score: score,
        position: null
      };
      ads_score.push(ad_score);
    }

    ads_score.sort((a, b) => (a.score > b.score ? -1 : 1));
    for (let i = 0; i < ads_score.length; i++) {
      ads_score[i].position = i;
    }

    return ads_score;
  }
};
