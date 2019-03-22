import { Prisma } from "../../src/generated/prisma-client";

export const seedCarCategories = async (prisma: Prisma) => {
  await prisma.createCarCategory({
    name: "SUV"
  });

  await prisma.createCarCategory({
    name: "Sedan"
  });

  await prisma.createCarCategory({
    name: "Pickup"
  });

  await prisma.createCarCategory({
    name: "Wagon"
  });

  await prisma.createCarCategory({
    name: "Hatchback"
  });

  await prisma.createCarCategory({
    name: "Coupe"
  });

  await prisma.createCarCategory({
    name: "Convertible"
  });

  await prisma.createCarCategory({
    name: "Chassis"
  });

  await prisma.createCarCategory({
    name: "Truck"
  });

  await prisma.createCarCategory({
    name: "Van"
  });

  await prisma.createCarCategory({
    name: "Crossover"
  });

  await prisma.createCarCategory({
    name: "Incomplete - Cutaway"
  });

  await prisma.createCarCategory({
    name: "Bus"
  });

  await prisma.createCarCategory({
    name: "Incomplete"
  });

  await prisma.createCarCategory({
    name: "Liftback"
  });

  await prisma.createCarCategory({
    name: "Motorcycle - Street"
  });

  await prisma.createCarCategory({
    name: "Motorcycle - Scooter"
  });

  await prisma.createCarCategory({
    name: "Motorcycle - Sport"
  });

  await prisma.createCarCategory({
    name: "Minivan"
  });

  await prisma.createCarCategory({
    name: "Truck - Tractor"
  });
};
