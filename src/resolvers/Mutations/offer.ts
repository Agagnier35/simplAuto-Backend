import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { getUserId, Context, getUserPermissions } from "../../utils";
import {
  OfferUpdateInput,
  User,
  Ad,
  Offer,
  CarStatus,
  Car,
  AdStatus
} from "../../generated/prisma-client";
import { OfferCreateInput } from "../../generated/prisma-client/index";
import {
  UserNotCreatorError,
  AdNotOneMarketError,
  OfferNotOnMarketError
} from "../../errors/authErrors";
import {
  CannotCreateOfferOnOwnAd,
  CannotCreateOfferWithNotOwnedCar
} from "../../errors/offerErrors";
const sgMail = require("@sendgrid/mail");

interface OfferResolver {
  deleteOffer: Types.DeleteOfferResolver;
  updateOffer: Types.UpdateOfferResolver;
  createOffer: Types.CreateOfferResolver;
  acceptOffer: Types.AcceptOfferResolver;
  refuseOffer: Types.RefuseOfferResolver;
  sendNotificationEmail: Types.SendNotificationEmailResolver;
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
    if (adOwner.notificationInAppOffer) {
      await ctx.prisma.createNotification({
        owner: {
          connect: {
            id: adOwner.id
          }
        },
        type: "NEW_OFFER",
        objectID: offer.id
      });
    }

    return offer;
  },
  async updateOffer(parent, { data }, ctx: Context) {
    const { addons, id, ...rest } = data;

    const carCreator: User = await ctx.prisma
      .offer({ id })
      .car()
      .owner();
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
    const carCreator: User = await ctx.prisma
      .offer({ id })
      .car()
      .owner();
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
    const acceptedCar: Car = await ctx.prisma.offer({ id }).car();
    const acceptedOffer: Offer = await ctx.prisma.offer({ id });
    const carCreator: User = await ctx.prisma
      .offer({ id })
      .car()
      .owner();

    if (acceptedAd.status !== "PUBLISHED") {
      throw AdNotOneMarketError;
    }
    if (
      acceptedCar.status !== "PUBLISHED" ||
      acceptedOffer.status !== "PUBLISHED"
    ) {
      throw OfferNotOnMarketError;
    }

    const statusOffer: OfferStatus = "DELETED";
    await ctx.prisma.updateManyOffers({
      data: { status: statusOffer },
      where: { ad: { id } }
    });

    const statusSold: CarStatus = "SOLD";
    await ctx.prisma.updateCar({
      data: { status: statusSold },
      where: { id: acceptedCar.id }
    });

    const statusOfferAccepted: OfferStatus = "ACCEPTED";
    const statusAdAccepted: AdStatus = "ACCEPTED";
    await ctx.prisma.updateAd({
      data: { status: statusAdAccepted },
      where: { id: acceptedAd.id }
    });

    // Send a notification to the car owner
    await ctx.prisma.createNotification({
      owner: {
        connect: {
          id: carCreator.id
        }
      },
      type: "ACCEPTED_OFFER",
      objectID: id
    });

    return await ctx.prisma.updateOffer({
      data: { status: statusOfferAccepted },
      where: { id }
    });
  },
  async refuseOffer(parent, { id }, ctx: Context) {
    const offer: Offer = await ctx.prisma.offer({ id });
    const userId = getUserId(ctx);
    const adCreator: User = await ctx.prisma
      .offer({ id })
      .ad()
      .creator();

    if (offer.status !== "PUBLISHED") {
      throw OfferNotOnMarketError;
    }
    if (adCreator.id !== userId) {
      throw UserNotCreatorError;
    }

    const statusDeleted: OfferStatus = "REFUSED";
    return await ctx.prisma.updateOffer({
      data: { status: statusDeleted },
      where: { id }
    });
  },
  async sendNotificationEmail(parent, { id }, ctx: Context) {
    const carOwner: User = await ctx.prisma
      .offer({ id })
      .car()
      .owner();
    const adCreator: User = await ctx.prisma
      .offer({ id })
      .ad()
      .creator();

    const emailBuyer = adCreator.email;
    const firstNameBuyer = adCreator.firstName;
    const lastNameBuyer = adCreator.lastName;
    const companyNameBuyer = carOwner.companyName;
    let buyerName = "";
    if (companyNameBuyer !== "") {
      buyerName = companyNameBuyer;
    } else {
      buyerName = firstNameBuyer + " " + lastNameBuyer;
    }

    const emailSeller = carOwner.email;
    const firstNameSeller = carOwner.firstName;
    const lastNameSeller = carOwner.lastName;
    const companyNameSeller = carOwner.companyName;
    let sellerName = "";
    if (companyNameSeller !== "") {
      sellerName = companyNameSeller;
    } else {
      sellerName = firstNameSeller + " " + lastNameSeller;
    }
    const locationSeller = await ctx.prisma
      .user({ id: carOwner.id })
      .location();

    if (adCreator.notificationEmailOffer) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msgBuyer = {
        to: emailBuyer,
        from: "simplauto@yopmail.com",
        subject: "Simplauto accepted offer",
        templateId: "d-610f2cc8284a4126b47bb4ec21fb0f95",
        dynamic_template_data: {
          name: buyerName,
          location: locationSeller.name,
          link: `${process.env.FRONTEND_URL}/offer?id=${id}`
        }
      };
      sgMail.send(msgBuyer);
    }

    if (carOwner.notificationEmailOffer) {
      const msgSeller = {
        to: emailSeller,
        from: "simplauto@yopmail.com",
        subject: "Simplauto accepted offer",
        templateId: "d-f7b59ea95033476e8d8fe55a185cece7",
        dynamic_template_data: {
          name: sellerName,
          location: locationSeller.name,
          link: `${process.env.FRONTEND_URL}/offer?id=${id}`
        }
      };
      sgMail.send(msgSeller);
    }

    return "emailSent";
  }
};
