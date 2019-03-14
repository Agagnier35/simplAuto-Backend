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

  offers: async (parent, { pageNumber, pageSize }, ctx: Context) => {
    const id = parent.id;
    const manufacturer = await ctx.prisma.ad({ id }).manufacturer();
    const model = await ctx.prisma.ad({ id }).model();
    const category = await ctx.prisma.ad({ id }).category();
    const resolverArg: any = {
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
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }
    return ctx.prisma.ad({ id }).offers(resolverArg);
  },

  offerCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .offersConnection({
        where: {
          status: "PUBLISHED",
          ad: {
            id
          }
        }
      })
      .aggregate()
      .count();
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
