import {
  Prisma,
  User,
  Offer,
  OfferAddon,
  Ad,
  Car
} from "../../src/generated/prisma-client";

export const seedOffers = async (prisma: Prisma) => {
  // Get all to make seeding multiple offers easier
  const users: User[] = await prisma.users();
  const addons: OfferAddon[] = await prisma.offerAddons();

  const ad1: Ad[] = await prisma.ads({
    where: { creator: { email: "dominic@yopmail.com" } }
  });
  const car1: Car[] = await prisma.cars({
    where: { owner: { email: "king@yopmail.com" } }
  });

  const offer1: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    ad: { connect: { id: ad1[0].id } },
    car: { connect: { id: car1[0].id } },
    price: 10000,
    status: "PUBLISHED",
    addons: { connect: [{ id: addons.find(a => a.name === "tires").id }] }
  });
};
