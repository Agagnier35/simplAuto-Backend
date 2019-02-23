import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface OffersQueries {
  offerAddons: QueryResolvers.OfferAddonsResolver;
}

export const offers: OffersQueries = {
  offerAddons(parent, args, ctx: Context) {
    return ctx.prisma.offerAddons({
      where: {
        rankValue_gt: 0
      }
    });
  }
};
