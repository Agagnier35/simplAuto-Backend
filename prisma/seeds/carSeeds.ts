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

  const car1 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Jeep").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Wrangler").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Minivan").id }
    },
    year: 2018,
    mileage: 102000,
    status: "PUBLISHED",
    features: { connect: [{ id: fireAileron[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1550179126/CarImages/e4hdx1xu38j87mv4ls6z.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1550510035/CarImages/gsj1yaqaol2beaqom0kg.webp"
      ]
    }
  });

  const car2 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Honda").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Civic").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Motorcycle - Scooter").id
      }
    },
    year: 2020,
    mileage: 5,
    status: "PUBLISHED",
    features: { connect: [{ id: fireAileron[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1550946108/CarImages/mdqng4tzsn2tk1c3ncar.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1550946110/CarImages/opwr3g8gjxaq3lu8po9a.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1550946109/CarImages/noq1xat8t0qbqop9smum.jpg"
      ]
    }
  });
};
