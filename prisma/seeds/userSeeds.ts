import { Prisma } from "../../src/generated/prisma-client";

export const seedUsers = async (prisma: Prisma) => {
  const user1 = await prisma.createUser({
    email: "dominic@yopmail.com",
    firstName: "Dominic",
    lastName: "Bergeron",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: "Laval",
    birthDate: { create: { day: 9, month: 5, year: 1990 } },
    gender: "MALE",
    permissions: { set: ["USER", "ADMIN"] },
    clientType: "INDIVIDUAL"
  });

  const user2 = await prisma.createUser({
    email: "alexandre_clark@yopmail.com",
    firstName: "Alexandre",
    lastName: "Clark",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: "Montreal",
    birthDate: { create: { day: 20, month: 2, year: 1992 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL"
  });

  const user3 = await prisma.createUser({
    email: "king@yopmail.com",
    firstName: "King",
    lastName: "Dave",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: "Montreal",
    birthDate: { create: { day: 9, month: 9, year: 1994 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL"
  });
};
