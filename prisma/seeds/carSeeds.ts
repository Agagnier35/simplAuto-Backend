import {
  Prisma,
  Manufacturer,
  User,
  CarCategory,
  CarModel,
  CarFeature
} from "../../src/generated/prisma-client";

export const seedCars = async (prisma: Prisma) => {
  // Get all to make seeding multiple Ads easier
  const users: User[] = await prisma.users();
  const manufacturers: Manufacturer[] = await prisma.manufacturers();
  const carModels: CarModel[] = await prisma.carModels();
  const carCategories: CarCategory[] = await prisma.carCategories();

  const fireAileron: CarFeature[] = await prisma.carFeatures({
    where: { name: "fire", category: { name: "aileron" } }
  });
  console.log(fireAileron);

  const car1 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Jeep").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Wrangler").id } },
    category: { connect: { id: carCategories.find(c => c.name === "vus").id } },
    year: 2018,
    mileage: 102000,
    status: "PUBLISHED",
    features: { connect: [{ id: fireAileron[0].id }] }
  });
};
