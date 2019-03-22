import { Prisma } from "../../src/generated/prisma-client";
import { createCustomer, deleteSeededCustomers } from "../../src/stripe";
import { Context } from "../../src/utils";

export const seedUsers = async (prisma: Prisma) => {
  const ctx = { prisma } as Context;

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

  // Create stripe customers for the accounts
  await deleteSeededCustomers();
  await createCustomer(user1, ctx);
  await createCustomer(user2, ctx);
  await createCustomer(user3, ctx);
};
