import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
  allAdsCount: QueryResolvers.AllAdsCountResolver;
}

export const ads: AdsQueries = {
  ads(parent, { pageNumber, pageSize }, ctx: Context) {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.ads(resolverArg);
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },
  allAdsCount(parent, args, ctx: Context) {
    return ctx.prisma
      .adsConnection()
      .aggregate()
      .count();
  }
};
