import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";
import { AuthError } from "./errors/authErrors";

export interface Context {
  prisma: Prisma;
  request: any;
  response: any;
}

export function getUserId(ctx: Context) {
  const userId = ctx.request.userId;

  if (userId) {
    return userId;
  }

  throw AuthError;
}
