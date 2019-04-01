import { Car, Offer, Ad } from "../generated/prisma-client";

const weight = {
  price: 50,
  manufacturer: 11,
  model: 11,
  category: 10,
  mileage: 10,
  year: 8
};

const maxDeviation = 0.3;

interface Score {
  total: number;
  max: number;
}

export function calcScoreSuggestion(
  offerCar: Car,
  offer: Offer,
  ad: Ad,
  sameManufacturer: boolean,
  sameModel: boolean,
  sameCategory: boolean
) {
  let score: Score = { total: 0, max: 0 };

  score = calcPrice(ad, offer, score);

  score = calcManufacturer(sameManufacturer, score);
  score = calcModel(sameModel, score);
  score = calcCategory(sameCategory, score);
  score = calcMilleage(ad, offerCar, score);
  score = calcYear(ad, offerCar, score);

  return Math.floor((score.total / score.max) * 100);
}

export function calcScoreAdSuggestion(
  ad: Ad,
  yourCar: Car,
  sameManufacturer: boolean,
  sameModel: boolean,
  sameCategory: boolean
) {
  let score: Score = { total: 0, max: 0 };

  score = calcManufacturer(sameManufacturer, score);
  score = calcModel(sameModel, score);
  score = calcCategory(sameCategory, score);
  score = calcMilleage(ad, yourCar, score);
  score = calcYear(ad, yourCar, score);

  return Math.floor((score.total / score.max) * 100);
}

function calcPrice(ad: Ad, offer: Offer, score: Score) {
  if (ad.priceLowerBound != null && ad.priceHigherBound != null) {
    if (offer.price < ad.priceLowerBound) {
      const priceScore = lowerLinearRegression(
        offer.price,
        ad.priceLowerBound,
        weight.price
      );
      score.total += priceScore;
    } else if (offer.price > ad.priceHigherBound) {
      const priceScore = higherLinearRegression(
        offer.price,
        ad.priceHigherBound,
        weight.price
      );
      score.total += priceScore;
    } else {
      score.total += weight.price;
    }
    score.max += weight.price;
  }

  return score;
}

function calcManufacturer(sameManufacturer: boolean, score: Score) {
  if (sameManufacturer != null) {
    if (sameManufacturer) {
      score.total += weight.manufacturer;
    }

    score.max += weight.manufacturer;
  }
  return score;
}

function calcModel(sameModel: boolean, score: Score) {
  if (sameModel != null) {
    if (sameModel) {
      score.total += weight.model;
    }
    score.max += weight.model;
  }
  return score;
}

function calcCategory(sameCategory: boolean, score: Score) {
  if (sameCategory != null) {
    if (sameCategory) {
      score.total += weight.category;
    }
    score.max += weight.category;
  }
  return score;
}

function calcMilleage(ad: Ad, car: Car, score: Score) {
  if (ad.mileageHigherBound != null && ad.mileageLowerBound != null) {
    if (car.mileage < ad.mileageLowerBound) {
      const mileageScore = lowerLinearRegression(
        car.mileage,
        ad.mileageLowerBound,
        weight.mileage
      );
      score.total += mileageScore;
    } else if (car.mileage > ad.mileageHigherBound) {
      const mileageScore = higherLinearRegression(
        car.mileage,
        ad.mileageHigherBound,
        weight.mileage
      );
      score.total += mileageScore;
    } else {
      score.total += weight.mileage;
    }
    score.max += weight.mileage;
  }
  return score;
}

function calcYear(ad: Ad, car: Car, score: Score) {
  if (ad.yearHigherBound != null && ad.yearLowerBound != null) {
    if (car.year > ad.yearLowerBound - 1 && car.year < ad.yearHigherBound + 1) {
      score.total += weight.year;
    }
    score.max += weight.year;
  }
  return score;
}

function lowerLinearRegression(
  value: number,
  lowerBound: number,
  weight: number
) {
  const minimum = lowerBound * (1 - maxDeviation);
  const gapAdMinimum = lowerBound - minimum;
  const gapOfferMinimum = value - minimum;
  const percScore = gapOfferMinimum / gapAdMinimum;
  const weightScore = weight * percScore;

  return weightScore > 0 ? weightScore : 0;
}

function higherLinearRegression(
  value: number,
  higherBound: number,
  weight: number
) {
  const maximum = higherBound * (1 + maxDeviation);
  const gapAdMaximum = maximum - higherBound;
  const gapOfferMaximum = maximum - value;
  const percScore = gapOfferMaximum / gapAdMaximum;
  const weightScore = weight * percScore;

  return weightScore > 0 ? weightScore : 0;
}
