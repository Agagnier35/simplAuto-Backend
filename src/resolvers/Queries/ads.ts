import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
  suggestion: QueryResolvers.SuggestionsResolver;
}

export const ads: AdsQueries = {
  ads(parent, args, ctx: Context) {
    return ctx.prisma.ads({
      where: {
        status: "PUBLISHED"
      }
    });
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },

  suggestion(parent, { id }, ctx: Context) {
    return ctx.prisma.offers();
  }
};
