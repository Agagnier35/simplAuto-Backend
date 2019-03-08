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
  },

  offers: ({ id }, { pageNumber, pageSize }, ctx: Context) => {
    const resolverArg: any = {};

    if (pageSize && pageNumber) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }
    return ctx.prisma.car({ id }).offers(resolverArg);
  },
  offerCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .offersConnection({
        where: {
          status: "PUBLISHED",
          car: {
            id
          }
        }
      })
      .aggregate()
      .count();
  },
  async photoCount({ id }, args, ctx: Context) {
    const cars = await ctx.prisma.car({ id }).photos();
    return cars.length;
  }
};
