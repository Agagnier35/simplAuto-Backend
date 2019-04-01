import { Context } from "../../utils";
import { AdResolvers } from "../../generated/yoga-client";
import {
  OfferWhereInput,
  OfferOrderByInput,
  CarWhereInput
} from "../../generated/prisma-client";

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

    const car: CarWhereInput = {};
    if (parent.mileageLowerBound) {
      car.mileage_gte = parent.mileageLowerBound;
    }
    if (parent.mileageHigherBound) {
      car.mileage_lte = parent.mileageHigherBound;
    }
    if (parent.yearLowerBound) {
      car.year_gte = parent.yearLowerBound;
    }
    if (parent.mileageHigherBound) {
      car.year_lte = parent.yearHigherBound;
    }
    if (manufacturer) {
      car.manufacturer = { id: manufacturer.id };
    }
    if (model) {
      car.model = { id: model.id };
    }
    if (category) {
      car.category = { id: category.id };
    }

    const where: OfferWhereInput = {
      car,
      status: "PUBLISHED"
    };
    if (parent.priceLowerBound) {
      where.price_gte = parent.priceLowerBound;
    }
    if (parent.priceHigherBound) {
      where.price_lte = parent.priceHigherBound;
    }

    const resolverArg: {
      where: OfferWhereInput;
      orderBy: OfferOrderByInput;
      skip?: number;
      first?: number;
    } = {
      where,
      orderBy: "price_ASC"
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return await ctx.prisma.ad({ id: parent.id }).offers(resolverArg);
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
