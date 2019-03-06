import { prisma } from "../src/generated/prisma-client";
import { seedUsers } from "./seeds/userSeeds";
import { seedCarFeaturesCategories } from "./seeds/carFeatureCategorySeeds";
import { seedCarManufacturers } from "./seeds/carManufacturerSeed";
import { seedOfferAddons } from "./seeds/offerAddonsSeeds";
import { seedAds } from "./seeds/adsSeeds";
import { seedCars } from "./seeds/carSeeds";
import { seedOffers } from "./seeds/offerSeeds";
import { seedCarCategories } from "./seeds/carCategorySeed";

const seedAll = async () => {
  // USERS
  await seedUsers(prisma);

  // CAR CHARACTERISTICS
  await seedCarCategories(prisma);
  await seedCarFeaturesCategories(prisma);
  await seedCarManufacturers(prisma);

  // ADS
  await seedAds(prisma);

  // CARS
  await seedCars(prisma);

  // OFFERS
  await seedOfferAddons(prisma);
  await seedOffers(prisma);
};

seedAll().catch(e => console.error(e));
