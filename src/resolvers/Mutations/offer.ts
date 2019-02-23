import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { getUserId, Context } from "../../utils";
import { OfferUpdateInput } from "../../generated/prisma-client";

interface OfferResolver {
  deleteOffer: Types.DeleteOfferResolver;
  updateOffer: Types.UpdateOfferResolver;
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
    const id = getUserId(ctx);
    const { adID, price, carID, addons } = data;

    return ctx.prisma.createOffer({
      price,
      creator: {
        connect: { id }
      },
      ad: {
        connect: { id: adID }
      },
      car: {
        connect: { id: carID }
      },
      addons: {
        connect: addons.filter(a => a.id).map(a => ({ id: a.id })),
        create: addons.filter(a => !a.id).map(a => ({ name: a.name }))
      }
    });
  },
  async updateOffer(parent, { data }, ctx: Context) {
    const updatedData: OfferUpdateInput = {};
    const { price, addons } = data;

    // disconnect all addons, to handle removing addons
    await ctx.prisma.updateOffer({
      data: {
        addons: {
          disconnect: addons.map(a => ({ id: a.id }))
        }
      },
      where: { id: data.id }
    });
    // delete "custom" addons, to remove DB bloat
    await ctx.prisma.deleteManyOfferAddons({
      rankValue_not: 0,
      id_in: addons.map(a => a.id)
    });

    if (price) {
      updatedData.price = price;
    }
    if (addons) {
      updatedData.addons = {
        connect: addons.filter(a => a.id).map(a => ({ id: a.id })),
        create: addons.filter(a => !a.id).map(a => ({ name: a.name }))
      };
    }

    return ctx.prisma.updateOffer({
      data: updatedData,
      where: { id: data.id }
    });
  }
};
