import { getUserId, Context, getUserPermissions } from "../../utils";
import { carLimitReachedError } from "../../errors/carErrors";
import {
  MutationResolvers as Types,
  CarStatus
} from "../../generated/yoga-client";
import { OfferStatus } from "../../generated/prisma-client";

const MAX_CARS = 2;

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

    // Only 2 cars by user
    const currentCars = await ctx.prisma.cars({
      where: { owner: { id }, status: "PUBLISHED" }
    });

    const carlimitReached = currentCars.length >= MAX_CARS;
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
