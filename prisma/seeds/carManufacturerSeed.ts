import { Prisma } from "../../src/generated/prisma-client";

export const seedCarManufacturers = async (prisma: Prisma) => {
  const Volkswagen = await prisma.createManufacturer({
    name: "Volkswagen",
    models: { create: [{ name: "Golf" }, { name: "Jetta" }] }
  });

  const Honda = await prisma.createManufacturer({
    name: "Honda",
    models: { create: [{ name: "Civic" }] }
  });

  const Jeep = await prisma.createManufacturer({
    name: "Jeep",
    models: { create: [{ name: "Grand Cherokee" }, { name: "Wrangler" }] }
  });
};
