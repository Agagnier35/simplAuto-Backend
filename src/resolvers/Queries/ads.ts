import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
}

export const ads: AdsQueries = {
  ads(parent, args, ctx: Context) {
    return ctx.prisma.ads();
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },
};
