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

  offers: (parent, args, ctx: Context) => {
    return ctx.prisma.ad({ id: parent.id }).offers({
      where: {
        status: "PUBLISHED",
        price_gt: parent.priceLowerBound,
        price_lt: parent.priceHigherBound,
        car: {manufacturer:{id: parent}
        ,

      }
    });
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
