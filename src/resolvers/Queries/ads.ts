import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
}

export const ads: AdsQueries = {
  ads(parent, args, ctx: Context) {
    // TODO apply search criterias
    return ctx.prisma.ads();
  }
};
