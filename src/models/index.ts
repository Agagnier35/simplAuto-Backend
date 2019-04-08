import {
  Offer,
  Ad,
  User,
  CarModel,
  Manufacturer
} from "../generated/prisma-client";

export interface OfferPosition {
  offer: Offer | null;
  position: number | null;
  score: number | null;
  totalLength: number | null;
}

export interface AdPosition {
  ad: Ad | null;
  position: number | null;
  score: number | null;
  totalLength: number | null;
}

export interface Statistics {
  averagePriceAPI: number;
  averageTimeOnMarketAPI: number;
  averagePriceApp: number;
  averageTimeOnMarketApp: number;
}

export interface AdminStatistics {
  top10MostSoldMakeModel: Top10Car[];
  top10FastestSold: Top10Car[];
  bestSeller: User;
  bestSellerTop10Cars: Top10Car[];
  allVehiculesCount: number;
  allAdsCount: number;
  activeUsersCount: number;
  inactiveUsersCount: number;
}

export interface Top10Car {
  model: CarModel;
  make: Manufacturer;
  count: number;
  averageTime: number;
  averagePrice: number;
}

export interface AdminCarResearchStatistics {
  averagePriceAPI: number;
  averageTimeOnMarketAPI: number;
  lowestPriceSoldAPI: number;
  highestPriceSoldAPI: number;
  lowestTimeOnMarketAPI: number;
  highestTimeOnMarketAPI: number;
  soldOnApp: number;
  averagePriceApp: number;
  averageTimeOnMarketApp: number;
  lowestPriceSoldApp: number;
  highestPriceSoldApp: number;
  lowestTimeOnMarketApp: number;
  highestTimeOnMarketApp: number;
}

export interface Prices {
  premiumAccount: number;
  carSpot: number;
  urgentAd: number;
  topAd: number;
}

export interface UsersPayload {
  count: number | null;
  users: User[] | null;
}
