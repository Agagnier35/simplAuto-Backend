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
    location: {
      create: {
        name: "Montreal, QC, Canada",
        longitude: -73.58781,
        latitude: 45.50884
      }
    },
    radius: 300,
    birthDate: { create: { day: 9, month: 5, year: 1990 } },
    gender: "MALE",
    permissions: { set: ["USER", "ADMIN"] },
    clientType: "INDIVIDUAL",
    carLimit: 5,
    language: "FRENCH"
  });

  const user2 = await prisma.createUser({
    email: "alexandre_clark@yopmail.com",
    firstName: "Alexandre",
    lastName: "Clark",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Montreal, QC, Canada",
        longitude: -73.58781,
        latitude: 45.50884
      }
    },
    radius: 50,
    birthDate: { create: { day: 20, month: 2, year: 1992 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL",
    carLimit: 3,
    language: "ENGLISH"
  });

  const user3 = await prisma.createUser({
    email: "king@yopmail.com",
    firstName: "King",
    lastName: "Dave",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Montreal, QC, Canada",
        longitude: -73.58781,
        latitude: 45.50884
      }
    },
    radius: 100000000,
    birthDate: { create: { day: 9, month: 9, year: 1994 } },
    gender: "MALE",
    permissions: { set: ["USER", "PREMIUM"] },
    clientType: "INDIVIDUAL",
    carLimit: 2,
    language: "FRENCH"
  });

  const user4 = await prisma.createUser({
    email: "marcat@yopmail.com",
    firstName: "Marc",
    lastName: "Guide",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Rosemère, QC, Canada",
        longitude: -73.793308,
        latitude: 45.643191
      }
    },
    radius: 24,
    birthDate: { create: { day: 9, month: 9, year: 1994 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL",
    carLimit: 2,
    language: "FRENCH"
  });

  const user5 = await prisma.createUser({
    email: "bellepro@yopmail.com",
    firstName: "",
    lastName: "",
    companyName: "Belle province",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Joliette, QC, Canada",
        longitude: -73.415947,
        latitude: 46.010721
      }
    },
    radius: 250,
    permissions: { set: ["USER"] },
    clientType: "COMPANY",
    carLimit: 2,
    language: "FRENCH"
  });

  const user6 = await prisma.createUser({
    email: "lol@yopmail.com",
    firstName: "lole",
    lastName: "etoile",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Côte Saint-Luc, QC, Canada",
        longitude: -73.652659,
        latitude: 45.475589
      }
    },
    radius: 2,
    birthDate: { create: { day: 9, month: 9, year: 1994 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL",
    carLimit: 2,
    language: "FRENCH"
  });

  const user7 = await prisma.createUser({
    email: "bad@yopmail.com",
    firstName: "bad",
    lastName: "boy",
    companyName: "",
    password: "$2b$10$dqyYw5XovLjpmkYNiRDEWuwKaRAvLaG45fnXE5b3KTccKZcRPka2m", // "secret42"
    location: {
      create: {
        name: "Côte Saint-Luc, QC, Canada",
        longitude: -73.652659,
        latitude: 45.475589
      }
    },
    radius: 60,
    birthDate: { create: { day: 9, month: 9, year: 1994 } },
    gender: "MALE",
    permissions: { set: ["USER"] },
    clientType: "INDIVIDUAL",
    carLimit: 2,
    language: "FRENCH"
  });

  // Create stripe customers for the accounts
  await deleteSeededCustomers();
  await createCustomer(user1, ctx);
  await createCustomer(user2, ctx);
  await createCustomer(user3, ctx);
  await createCustomer(user4, ctx);
  await createCustomer(user5, ctx);
  await createCustomer(user6, ctx);
  await createCustomer(user7, ctx);
};
