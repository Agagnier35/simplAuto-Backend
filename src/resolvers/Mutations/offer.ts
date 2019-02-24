import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { getUserId, Context } from "../../utils";
import { OfferUpdateInput } from "../../generated/prisma-client";
import { OfferCreateInput } from "../../generated/prisma-client/index";

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

    const offerInput: OfferCreateInput = {
      price,
      creator: {
        connect: { id }
      },
      ad: {
        connect: { id: adID }
      },
      car: {
        connect: { id: carID }
      }
    };

    if (addons) {
      offerInput.addons = {
        // Presets
        connect: addons.filter(a => a.id).map(a => ({ id: a.id })),
        // User created
        create: addons.filter(a => !a.id).map(a => ({ name: a.name }))
      };
    }

    return ctx.prisma.createOffer(offerInput);
  },
  async updateOffer(parent, { data }, ctx: Context) {
    const { addons, id, ...rest } = data;

    const updatedData: OfferUpdateInput = { ...rest };

    // disconnect all addons, to handle removing addons
    const previousAddons = await ctx.prisma.offer({ id }).addons();
    await ctx.prisma.updateOffer({
      data: {
        addons: {
          disconnect: previousAddons.map(a => ({ id: a.id }))
        }
      },
      where: { id: data.id }
    });

    // delete "custom" addons, to remove DB bloat
    await ctx.prisma.deleteManyOfferAddons({
      rankValue_lte: 0,
      id_in: previousAddons.map(a => a.id)
    });

    if (addons) {
      updatedData.addons = {
        connect: addons.filter(a => a.rankValue > 0).map(a => ({ id: a.id })),
        create: addons
          .filter(a => !a.rankValue || a.rankValue <= 0)
          .map(a => ({ name: a.name }))
      };
    }

    return ctx.prisma.updateOffer({
      data: updatedData,
      where: { id: data.id }
    });
  }
};
