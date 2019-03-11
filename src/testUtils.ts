import { Prisma } from "./generated/prisma-client";

export const getAdminContext = (prisma: jest.Mocked<Prisma>) => {
  return {
    prisma,
    request: { userId: "cjsxuzt5j048v0871rivcyc9v", permissions: "ADMIN" }
  };
};

export const getUserContext = (prisma: jest.Mocked<Prisma>) => {
  return {
    prisma,
    request: { userId: "cjsxuztcx049d087164xib1bd", permissions: "USER" }
  };
};

export const getContextWithId = (
  prisma: jest.Mocked<Prisma>,
  userId: String
) => {
  return {
    prisma,
    request: { userId, permissions: "USER" }
  };
};
