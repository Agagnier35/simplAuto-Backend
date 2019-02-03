import { Context } from "../../utils";
import { CarFeatureCategoryResolvers } from "../../generated/yoga-client";

export const CarFeatureCategory: CarFeatureCategoryResolvers.Type = {
  ...CarFeatureCategoryResolvers.defaultResolvers,

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.carFeatureCategory({ id }).features();
  }
};
