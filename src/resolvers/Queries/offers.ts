import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface OffersQueries {
  offer: QueryResolvers.OfferResolver;
  offerAddons: QueryResolvers.OfferAddonsResolver;
}

export const offers: OffersQueries = {
  async offer(parent, { id }, ctx: Context) {
    return ctx.prisma.offer({ id });
  },

  offerAddons(parent, args, ctx: Context) {
    return ctx.prisma.offerAddons({
      where: {
        rankValue_gt: 0
      }
    });
  }
};
