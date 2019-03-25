import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { getUserId, Context, getUserPermissions } from "../../utils";
import { OfferUpdateInput, User, Ad } from "../../generated/prisma-client";
import { OfferCreateInput } from "../../generated/prisma-client/index";
import {
  UserNotCreatorError,
  AdNotOneMarketError
} from "../../errors/authErrors";
import {
  CannotCreateOfferOnOwnAd,
  CannotCreateOfferWithNotOwnedCar
} from "../../errors/offerErrors";

interface OfferResolver {
  deleteOffer: Types.DeleteOfferResolver;
  updateOffer: Types.UpdateOfferResolver;
  createOffer: Types.CreateOfferResolver;
  acceptOffer: Types.AcceptOfferResolver;
}

export const offer: OfferResolver = {
  async createOffer(parent, { data }, ctx: Context) {
    const id = getUserId(ctx);
    const { adID, price, carID, addons } = data;

    const adCreator: User = await ctx.prisma.ad({ id: adID }).creator();
    const carOwner: User = await ctx.prisma.car({ id: carID }).owner();

    if (adCreator.id === id) {
      throw CannotCreateOfferOnOwnAd;
    }
    if (carOwner.id !== id) {
      throw CannotCreateOfferWithNotOwnedCar;
    }

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

    const offer = await ctx.prisma.createOffer(offerInput);

    const adOwner = await ctx.prisma.ad({ id: adID }).creator();

    // Send a notification to the ad owner
    await ctx.prisma.createNotification({
      owner: {
        connect: {
          id: adOwner.id
        }
      },
      type: "NEW_OFFER",
      objectID: offer.id
    });

    return offer;
  },
  async updateOffer(parent, { data }, ctx: Context) {
    const { addons, id, ...rest } = data;

    const carCreator: User = await ctx.prisma.car({ id }).owner();
    const userId = getUserId(ctx);

    if (
      !(carCreator.id === userId || getUserPermissions(ctx).includes("ADMIN"))
    ) {
      throw UserNotCreatorError;
    }

    const updatedData: OfferUpdateInput = { ...rest };

    // disconnect all addons, to handle removing addons
    const previousAddons = await ctx.prisma.offer({ id }).addons();
    if (previousAddons) {
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
  },
  async deleteOffer(parent, { id }, ctx: Context) {
    const carCreator: User = await ctx.prisma.car({ id }).owner();
    const userId = getUserId(ctx);

    if (
      !(carCreator.id === userId || getUserPermissions(ctx).includes("ADMIN"))
    ) {
      throw UserNotCreatorError;
    }

    const status: OfferStatus = "DELETED";
    return await ctx.prisma.updateOffer({
      data: { status },
      where: { id }
    });
  },
  async acceptOffer(parent, { id }, ctx: Context) {
    const acceptedAd: Ad = await ctx.prisma.offer({ id }).ad();

    if (acceptedAd.status !== "PUBLISHED") {
      throw AdNotOneMarketError;
    }

    const statusOffer: OfferStatus = "DELETED";
    await ctx.prisma.updateManyOffers({
      data: { status: statusOffer },
      where: { ad: { id } }
    });

    const statusAccepted: OfferStatus = "ACCEPTED";
    await ctx.prisma.updateAd({
      data: { status: statusAccepted },
      where: { id: acceptedAd.id }
    });

    return await ctx.prisma.updateOffer({
      data: { status: statusAccepted },
      where: { id }
    });
  }
};
