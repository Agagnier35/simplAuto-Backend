import { Prisma } from "./generated/prisma-client";

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
