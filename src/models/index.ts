import { Offer } from "../generated/prisma-client";

export interface OfferPosition {
  offer: Offer | null;
  position: number | null;
  score: number | null;
}
