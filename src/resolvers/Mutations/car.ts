import { getUserId, Context } from "../../utils";

const MAX_CARS = 2;

export const car = {
  async createCar(parent, { data }, ctx: Context, info) {
    const id = getUserId(ctx);
    const {
      manufacturerID,
      modelID,
      categoryID,
      featuresIDs,
      photos,
      ...rest
    } = data;

    // Only 2 cars by user
    // TODO : Put user_role in token and allow premium
    // TODO : Should return error when limit is reached...
    const currentCars = await ctx.prisma.cars();
    if (currentCars.length > MAX_CARS) return;

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
