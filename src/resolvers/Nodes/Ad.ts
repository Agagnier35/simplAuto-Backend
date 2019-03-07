import { Context } from "../../utils";
import { AdResolvers } from "../../generated/yoga-client";
import { parentPort } from "worker_threads";

export const Ad: AdResolvers.Type = {
  ...AdResolvers.defaultResolvers,

  model: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).model();
  },

  manufacturer: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).manufacturer();
  },

  category: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).category();
  },

  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).creator();
  },

  offers: async (parent, args, ctx: Context) => {
    const id = parent.id;
    const manufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const model = await ctx.prisma.ad({ id }).model();
    const category = await ctx.prisma.ad({ id }).category();

    return ctx.prisma.ad({ id: parent.id }).offers({
      where: {
        status: "PUBLISHED",
        price_gt: parent.priceLowerBound,
        price_lt: parent.priceHigherBound,
        car: {
          manufacturer: { id: manufacturer.id },
          model: { id: model.id },
          category: { id: category.id },
          mileage_gt: parent.mileageLowerBound,
          mileage_lt: parent.priceHigherBound,
          year_gt: parent.yearLowerBound,
          year_lt: parent.yearHigherBound
        }
      }
    });
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
