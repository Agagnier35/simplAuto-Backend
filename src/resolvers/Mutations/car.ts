import { getUserId, Context, getUserPermissions } from "../../utils";
import { carLimitReachedError } from "../../errors/carErrors";

const MAX_CARS = 2;

export const car = {
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
    const currentCars = await ctx.prisma.cars();
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
  }
};
