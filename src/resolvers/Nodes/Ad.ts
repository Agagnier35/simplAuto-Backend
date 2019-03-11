import { Context } from "../../utils";
import { AdResolvers } from "../../generated/yoga-client";

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
        price_gte: parent.priceLowerBound,
        price_lte: parent.priceHigherBound,
        car: {
          manufacturer: { id: manufacturer.id },
          model: { id: model.id },
          category: { id: category.id },
          mileage_gte: parent.mileageLowerBound,
          mileage_lte: parent.priceHigherBound,
          year_gte: parent.yearLowerBound,
          year_lte: parent.yearHigherBound
        }
      }
    });
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
