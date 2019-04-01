import { Offer, Ad, User } from "../generated/prisma-client";

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
