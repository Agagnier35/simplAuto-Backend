import {
  Prisma,
  Manufacturer,
  User,
  CarCategory,
  CarModel,
  CarFeature
} from "../../src/generated/prisma-client";

export const seedAds = async (prisma: Prisma) => {
  // Get all to make seeding multiple Ads easier
  const users: User[] = await prisma.users();
  const manufacturers: Manufacturer[] = await prisma.manufacturers();
  const carModels: CarModel[] = await prisma.carModels();
  const carCategories: CarCategory[] = await prisma.carCategories();

  const redColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "red", category: { name: "color" } }
  });

  const ad1 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    priceLowerBound: 50,
    priceHigherBound: 5000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Volkswagen").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Jetta").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 20000,
    yearLowerBound: 2016,
    yearHigherBound: 2018,
    features: { connect: [{ id: redColor[0].id }] }
  });

  const blueColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "blue", category: { name: "color" } }
  });

  const ad2 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    priceLowerBound: 5000,
    priceHigherBound: 10000,
    category: { connect: { id: carCategories.find(c => c.name === "SUV").id } },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Honda").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Civic").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 100000,
    yearLowerBound: 1800,
    yearHigherBound: 2020,
    features: { connect: [{ id: blueColor[0].id }] }
  });
};
