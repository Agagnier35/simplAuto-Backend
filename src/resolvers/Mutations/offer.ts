import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { Context } from "graphql-yoga/dist/types";

interface OfferResolver {
  deleteOffer: Types.DeleteOfferResolver;
  createOffer: Types.CreateOfferResolver;
}

export const offer: OfferResolver = {
  async deleteOffer(parent, { id }, ctx: Context) {
    const status: OfferStatus = "DELETED";
    return await ctx.prisma.updateOffer({
      data: { status },
      where: { id }
    });
  },

  async createOffer(parent, { data }, ctx: Context) {
    const { creatorID, adID, carID, price } = data;
    const status: OfferStatus = "PUBLISHED";

    return ctx.prisma.createOffer({
      price,
      status,
      creator: {
        connect: { id: creatorID }
      },
      ad: {
        connect: { id: adID }
      },
      car: {
        connect: { id: carID }
      }
    });
  }
};
