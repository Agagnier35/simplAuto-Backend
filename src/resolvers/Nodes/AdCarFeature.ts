import { Context } from "../../utils";
import {
  AdCarFeatureResolvers,
  PriceBoundFeatureResolvers,
  ManufacturerFeatureResolvers,
  ModelFeatureResolvers,
  CategoryFeatureResolvers,
  MileageBoundFeatureResolvers,
  YearBoundFeatureResolvers
} from "../../generated/yoga-client";

export const AdCarFeature: AdCarFeatureResolvers.Type = {
  ...AdCarFeatureResolvers.defaultResolvers,

  feature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.adCarFeature({ id }).feature();
  }
};

export const PriceBoundFeature: PriceBoundFeatureResolvers.Type = {
  ...PriceBoundFeatureResolvers.defaultResolvers
};

export const ModelFeature: ModelFeatureResolvers.Type = {
  ...ModelFeatureResolvers.defaultResolvers,

  model: ({ id }, args, ctx: Context) => {
    return ctx.prisma.modelFeature({ id }).model();
  }
};

export const MileageBoundFeature: MileageBoundFeatureResolvers.Type = {
  ...MileageBoundFeatureResolvers.defaultResolvers
};

export const YearBoundFeature: YearBoundFeatureResolvers.Type = {
  ...YearBoundFeatureResolvers.defaultResolvers
};

export const ManufacturerFeature: ManufacturerFeatureResolvers.Type = {
  ...ManufacturerFeatureResolvers.defaultResolvers,

  manufacturer: ({ id }, args, ctx: Context) => {
    return ctx.prisma.manufacturerFeature({ id }).manufacturer();
  }
};

export const CategoryFeature: CategoryFeatureResolvers.Type = {
  ...CategoryFeatureResolvers.defaultResolvers,

  category: ({ id }, args, ctx: Context) => {
    return ctx.prisma.categoryFeature({ id }).category();
  }
};
