import { Context } from "../../utils";

export const Car = {
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
