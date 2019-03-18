import { Offer, Ad } from "../generated/prisma-client";

export interface OfferPosition {
  offer: Offer | null;
  position: number | null;
  score: number | null;
}

export interface AdPosition {
  ad: Ad | null;
  position: number | null;
  score: number | null;
  total_length: number | null;
}

export interface Prices {
  premiumAccount: number;
  carSpot: number;
  urgentAd: number;
  topAd: number;
}
