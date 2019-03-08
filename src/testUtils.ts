import { Prisma } from "./generated/prisma-client";
jest.mock("./generated/prisma-client");

export const createPrismaMock = (): jest.Mocked<Prisma> => new Prisma() as any;

export const getAdminContext = (prisma: jest.Mocked<Prisma>) => {
  return {
    prisma,
    request: { userId: "cjsxuzt5j048v0871rivcyc9v" }
  };
};

export const getUserContext = (prisma: jest.Mocked<Prisma>) => {
  return {
    prisma,
    request: { userId: "cjsxuztcx049d087164xib1bd" }
  };
};
