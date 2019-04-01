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
  const blueColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "blue", category: { name: "color" } }
  });
  const goldColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "gold", category: { name: "color" } }
  });
  const yellowColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "yellow", category: { name: "color" } }
  });
  const orangeColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "orange", category: { name: "color" } }
  });
  const greyColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "grey", category: { name: "color" } }
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

  const ad7 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 12000,
    priceHigherBound: 26000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Coupe").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Audi").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Q8").id } },
    mileageLowerBound: 20000,
    mileageHigherBound: 120000,
    yearLowerBound: 1980,
    yearHigherBound: 2020,
    features: { connect: [{ id: greyColor[0].id }] }
  });

  const ad8 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 20000,
    priceHigherBound: 36000,
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

  const ad9 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 3000,
    priceHigherBound: 8000,
    category: { connect: { id: carCategories.find(c => c.name === "Bus").id } },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Dodge").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Aries").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 125000,
    yearLowerBound: 1925,
    yearHigherBound: 2020,
    features: { connect: [{ id: yellowColor[0].id }] }
  });

  const ad10 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 8000,
    priceHigherBound: 15000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Wagon").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "GMC").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Vandura").id } },
    mileageLowerBound: 30000,
    mileageHigherBound: 100000,
    yearLowerBound: 2001,
    yearHigherBound: 2019,
    features: { connect: [{ id: goldColor[0].id }] }
  });

  const ad11 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 1000,
    priceHigherBound: 6000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Pickup").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Oldsmobile").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Bravada").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 70000,
    yearLowerBound: 1800,
    yearHigherBound: 2015,
    features: { connect: [{ id: orangeColor[0].id }] }
  });
};
