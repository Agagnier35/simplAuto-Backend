import { Context } from "../../utils";
import { CarFeatureResolvers } from "../../generated/yoga-client";

export const CarFeature: CarFeatureResolvers.Type = {
  ...CarFeatureResolvers.defaultResolvers,

  category: ({ id }, args, ctx: Context) => {
    return ctx.prisma.carFeature({ id }).category();
  }
};
