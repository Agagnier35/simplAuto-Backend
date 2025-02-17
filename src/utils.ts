import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";
import { AuthError } from "./errors/authErrors";

export interface Context {
  prisma: Prisma;
  request: any;
  response: any;
}

// TODO Might be a good move to merge those two...
export function getUserId(ctx: Context) {
  const userId = ctx.request.userId;

  if (userId) {
    return userId;
  }

  throw AuthError;
}

export function getUserPermissions(ctx: Context) {
  const permissions = ctx.request.permissions;

  if (permissions) {
    return permissions;
  }

  throw AuthError;
}

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const resetTokenExpiryTime = 1800000;
