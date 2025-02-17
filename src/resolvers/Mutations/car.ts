import { getUserId, Context, getUserPermissions } from "../../utils";
import { carLimitReachedError } from "../../errors/carErrors";
import {
  MutationResolvers as Types,
  CarStatus
} from "../../generated/yoga-client";
import { OfferStatus, User } from "../../generated/prisma-client";
import { UserNotCreatorError } from "../../errors/authErrors";

export const MAX_CARS = 2;
export const MAX_CARS_NOT_PREMIUM = 5;

interface CarResolvers {
  createCar: Types.CreateCarResolver;
  deleteCar: Types.DeleteCarResolver;
}

export const car: CarResolvers = {
  async createCar(parent, { data }, ctx: Context, info) {
    const {
      manufacturerID,
      modelID,
      categoryID,
      featuresIDs,
      photos,
      ...rest
    } = data;

    const id = getUserId(ctx);
    const permissions = getUserPermissions(ctx);
    const user: User = await ctx.prisma.user({ id });

    // Only 2 cars by user
    const currentCars = await ctx.prisma.cars({
      where: { owner: { id }, status: "PUBLISHED" }
    });

    const carlimitReached = currentCars.length >= user.carLimit;
    const isPremium = permissions && permissions.includes("PREMIUM");
    if (carlimitReached && !isPremium) {
      throw carLimitReachedError;
    }

    return ctx.prisma.createCar({
      ...rest,
      owner: {
        connect: { id }
      },
      manufacturer: {
        connect: { id: manufacturerID }
      },
      model: {
        connect: { id: modelID }
      },
      category: {
        connect: { id: categoryID }
      },
      features: {
        connect: featuresIDs.map(feature => ({
          id: feature
        }))
      },
      photos: {
        set: photos
      }
    });
  },
  async deleteCar(parent, { id }, ctx: Context) {
    const carCreator: User = await ctx.prisma.car({ id }).owner();
    const userId = getUserId(ctx);

    if (
      !(carCreator.id === userId || getUserPermissions(ctx).includes("ADMIN"))
    ) {
      throw UserNotCreatorError;
    }

    const statusOffer: OfferStatus = "DELETED";
    await ctx.prisma.updateManyOffers({
      data: { status: statusOffer },
      where: { car: { id } }
    });

    const statusCar: CarStatus = "DELETED";
    return ctx.prisma.updateCar({
      data: { status: statusCar },
      where: { id }
    });
  }
};
