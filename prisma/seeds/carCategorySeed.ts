import { Prisma } from "../../src/generated/prisma-client";

export const seedCarCategories = async (prisma: Prisma) => {
  const vus = await prisma.createCarCategory({
    name: "vus"
  });

  const sedan = await prisma.createCarCategory({
    name: "sedan"
  });

  const hotWheel = await prisma.createCarCategory({
    name: "hot wheel"
  });
};
