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
    const manufacturer = await ctx.prisma.ad({ id: parent.id }).manufacturer();
    const model = await ctx.prisma.ad({ id: parent.id }).model();
    const category = await ctx.prisma.ad({ id: parent.id }).category();
    const resolverArg: any = {
      where: {
        status: "PUBLISHED",
        price_gte: parent.priceLowerBound,
        price_lte: parent.priceHigherBound,

        car: {
          manufacturer: { id: manufacturer ? manufacturer.id : null },
          model: { id: model ? model.id : null },
          category: { id: category ? category.id : null },
          mileage_gte: parent.mileageLowerBound,
          mileage_lte: parent.priceHigherBound,
          year_gte: parent.yearLowerBound,
          year_lte: parent.yearHigherBound
        }
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }
    return ctx.prisma.ad({ id: parent.id }).offers(resolverArg);
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
