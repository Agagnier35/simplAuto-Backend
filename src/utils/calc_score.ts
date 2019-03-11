import { Car, Offer, Ad, Int, Float } from "../generated/prisma-client";

const weight = {
  price: 50,
  manufacturer: 7,
  model: 7,
  category: 14,
  mileage: 14,
  year: 8
};

const max_deviation = 0.3;

function lower_linear_regression(value: Int, lowerBound: Int, weight: number) {
  const minimum = lowerBound * (1 - max_deviation);
  const gap_ad_minimum = lowerBound - minimum;
  const gap_offer_minimum = value - minimum;
  const perc_score = gap_offer_minimum / gap_ad_minimum;
  const weight_score = weight * perc_score;

  return weight_score > 0 ? weight_score : 0;
}

function higher_linear_regression(
  value: Int,
  higherBound: Int,
  weight: number
) {
  const maximum = higherBound * (1 + max_deviation);
  const gap_ad_maximum = maximum - higherBound;
  const gap_offer_maximum = maximum - value;
  const perc_score = gap_offer_maximum / gap_ad_maximum;
  const weight_score = weight * perc_score;

  return weight_score > 0 ? weight_score : 0;
}

export function calc_score_suggestion(
  offerCar: Car,
  offer: Offer,
  ad: Ad,
  sameManufacturer: Boolean,
  sameModel: Boolean,
  sameCategory: Boolean
) {
  let total_score = 0;
  let max_score = 0;

  //price
  if (ad.priceLowerBound != null && ad.priceHigherBound != null) {
    if (offer.price < ad.priceLowerBound) {
      const priceScore = lower_linear_regression(
        offer.price,
        ad.priceLowerBound,
        weight.price
      );
      total_score += priceScore;
    } else if (offer.price > ad.priceHigherBound) {
      const priceScore = higher_linear_regression(
        offer.price,
        ad.priceHigherBound,
        weight.price
      );
      total_score += priceScore;
    } else {
      total_score += weight.price;
    }
    max_score += weight.price;
  }

  // manufacturer
  if (sameManufacturer != null) {
    if (sameManufacturer) {
      total_score += weight.manufacturer;
    }

    max_score += weight.manufacturer;
  }
  // model
  if (sameModel != null) {
    if (sameModel) {
      total_score += weight.model;
    }
    max_score += weight.model;
  }
  //Category
  if (sameCategory != null) {
    if (sameCategory) {
      total_score += weight.category;
    }
    max_score += weight.category;
  }
  //mileage

  if (ad.mileageHigherBound != null && ad.mileageLowerBound != null) {
    if (offerCar.mileage < ad.mileageLowerBound) {
      const mileageScore = lower_linear_regression(
        offerCar.mileage,
        ad.mileageLowerBound,
        weight.mileage
      );
      total_score += mileageScore;
    } else if (offerCar.mileage > ad.mileageHigherBound) {
      const mileageScore = higher_linear_regression(
        offerCar.mileage,
        ad.mileageHigherBound,
        weight.mileage
      );
      total_score += mileageScore;
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
    }
    max_score += weight.year;
  }

  return Math.floor((total_score / max_score) * 100);
}

export function calc_score_adSuggestion(
  ad: Ad,
  yourCar: Car,
  sameManufacturer: Boolean,
  sameModel: Boolean,
  sameCategory: Boolean
) {
  let total_score = 0;
  let max_score = 0;

  // manufacturer
  if (sameManufacturer != null) {
    if (sameManufacturer) {
      total_score += weight.manufacturer;
    }
    max_score += weight.manufacturer;
  }

  // model
  if (sameModel != null) {
    if (sameModel) {
      total_score += weight.model;
    }
    max_score += weight.model;
  }

  //Category
  if (sameCategory != null) {
    if (sameCategory) {
      total_score += weight.category;
    }
    max_score += weight.category;
  }

  //mileage

  if (ad.mileageHigherBound != null && ad.mileageLowerBound != null) {
    if (yourCar.mileage < ad.mileageLowerBound) {
      const mileageScore = lower_linear_regression(
        yourCar.mileage,
        ad.mileageLowerBound,
        weight.mileage
      );
      total_score += mileageScore;
    } else if (yourCar.mileage > ad.mileageHigherBound) {
      const mileageScore = higher_linear_regression(
        yourCar.mileage,
        ad.mileageHigherBound,
        weight.mileage
      );
      total_score += mileageScore;
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
    }
    max_score += weight.year;
  }

  return Math.floor((total_score / max_score) * 100);
}
