import { Context } from "../../utils";
import { AdResolvers } from "../../generated/yoga-client";

export const Ad: AdResolvers.Type = {
  ...AdResolvers.defaultResolvers,

  priceLowerBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).priceLowerBoundFeature();
  },

  priceHigherBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).priceHigherBoundFeature();
  },

  manufacturerFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).manufacturerFeature();
  },

  modelFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).modelFeature();
  },

  categoryFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).categoryFeature();
  },

  mileageLowerBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).mileageLowerBoundFeature();
  },

  mileageHigherBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).mileageHigherBoundFeature();
  },

  yearLowerBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).yearLowerBoundFeature();
  },

  yearHigherBoundFeature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).yearHigherBoundFeature();
  },

  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).creator();
  },

  offers: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).offers();
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
