import { Context } from "../../utils";
import { CarResolvers } from "../../generated/yoga-client";

export const Car: CarResolvers.Type = {
  ...CarResolvers.defaultResolvers,

  owner: ({ id }, args, ctx: Context) => {
    return ctx.prisma.car({ id }).owner();
  },

  manufacturer: ({ id }, args, ctx: Context) => {
    return ctx.prisma.car({ id }).manufacturer();
  },

  model: ({ id }, args, ctx: Context) => {
    return ctx.prisma.car({ id }).model();
  },

  category: ({ id }, args, ctx: Context) => {
    return ctx.prisma.car({ id }).category();
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.car({ id }).features();
  }
};
