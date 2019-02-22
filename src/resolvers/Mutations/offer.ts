import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { getUserId, Context } from "../../utils";

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
    const userID = getUserId(ctx);

    const { adID, price, carID } = data;

    return ctx.prisma.createOffer({
      price,
      creator: {
        connect: { id: userID }
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
