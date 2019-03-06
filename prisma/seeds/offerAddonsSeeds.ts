import { Prisma } from "../../src/generated/prisma-client";

export const seedOfferAddons = async (prisma: Prisma) => {
  const Mags = await prisma.createOfferAddon({ name: "mags", rankValue: 5 });

  const Tires = await prisma.createOfferAddon({ name: "tires", rankValue: 10 });
};
