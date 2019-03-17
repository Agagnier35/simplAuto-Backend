import { Prisma } from "../../src/generated/prisma-client";
import { allMakeSeed } from "./carMakeSeed";

export const seedCarManufacturers = async (prisma: Prisma) => {
  allMakeSeed.forEach(async makeSeed => {
    await prisma.createManufacturer({
      name: makeSeed.make,
      models: {
        create: makeSeed.model.map(modelSeed => ({ name: modelSeed.item }))
      }
    });
  });
};
