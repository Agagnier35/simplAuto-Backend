import { Context } from "../../utils";
import { AdFeatureResolvers } from "../../generated/yoga-client";

export const AdFeature: AdFeatureResolvers.Type = {
  ...AdFeatureResolvers.defaultResolvers,

  feature: ({ id }, args, ctx: Context) => {
    return ctx.prisma.adFeature({ id }).feature();
  }
};
