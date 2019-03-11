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
}
