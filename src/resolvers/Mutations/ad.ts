import { getUserId, Context, getUserPermissions } from "../../utils";
import {
  MutationResolvers as Types,
  AdStatus
} from "../../generated/yoga-client";
import {
  AdCreateInput,
  OfferStatus,
  AdUpdateInput,
  User
} from "../../generated/prisma-client/index";
import { UserNotCreatorError } from "../../errors/authErrors";
import {
  InvalidPriceBoundsError,
  InvalidYearBoundsError,
  InvalidMileageBoundsError
} from "../../errors/adErrors";

interface AdResolvers {
  createAd: Types.CreateAdResolver;
  updateAd: Types.UpdateAdResolver;
  deleteAd: Types.DeleteAdResolver;
}

const validatePriceBounds = (data: any) => {
  return (
    data.priceHigherBound &&
    data.priceLowerBound &&
    data.priceLowerBound > data.priceHigherBound
  );
};

const validateYearBounds = (data: any) => {
  return (
    data.yearLowerBound &&
    data.yearLowerBound &&
    data.yearLowerBound > data.yearHigherBound
  );
};

const validateMileageBounds = (data: any) => {
  return (
    data.mileageLowerBound &&
    data.mileageLowerBound &&
    data.mileageLowerBound > data.mileageHigherBound
  );
};

export const ad: AdResolvers = {
  async createAd(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { manufacturerID, modelID, categoryID, features, ...rest } = data;

    if (validatePriceBounds(data)) {
      throw InvalidPriceBoundsError;
    }

    if (validateYearBounds(data)) {
      throw InvalidYearBoundsError;
    }

    if (validateMileageBounds(data)) {
      throw InvalidMileageBoundsError;
    }

    const mutation: AdCreateInput = {
      ...rest,
      creator: {
        connect: { id: userId }
      }
    };

    if (manufacturerID) {
      mutation.manufacturer = {
        connect: { id: manufacturerID }
      };
    }

    if (modelID) {
      mutation.model = {
        connect: { id: modelID }
      };
    }

    if (categoryID) {
      mutation.category = {
        connect: { id: categoryID }
      };
    }

    if (features && features.length > 0) {
      mutation.features = {
        connect: features.map(feature => ({
          id: feature
        }))
      };
    }
    return ctx.prisma.createAd(mutation);
  },

  async updateAd(parent, { data }, ctx: Context) {
    const {
      id,
      manufacturerID,
      modelID,
      categoryID,
      features,
      priceLowerBound,
      priceHigherBound,
      mileageLowerBound,
      mileageHigherBound,
      yearLowerBound,
      yearHigherBound
    } = data;

    const adCreator: User = await ctx.prisma.ad({ id }).creator();
    const userId = getUserId(ctx);

    if (!(adCreator.id === userId || getUserPermissions(ctx) === "ADMIN")) {
      throw UserNotCreatorError;
    }

    const updatedData: AdUpdateInput = {};

    updatedData.priceLowerBound = priceLowerBound ? priceLowerBound : null;
    updatedData.priceHigherBound = priceHigherBound ? priceHigherBound : null;
    updatedData.mileageLowerBound = mileageLowerBound
      ? mileageLowerBound
      : null;
    updatedData.mileageHigherBound = mileageHigherBound
      ? mileageHigherBound
      : null;
    updatedData.yearLowerBound = yearLowerBound ? yearLowerBound : null;
    updatedData.yearHigherBound = yearHigherBound ? yearHigherBound : null;

    updatedData.manufacturer = manufacturerID
      ? { connect: { id: manufacturerID } }
      : null;

    updatedData.model = modelID ? { connect: { id: modelID } } : null;

    updatedData.category = categoryID ? { connect: { id: categoryID } } : null;

    if (features && features.length > 0) {
      updatedData.features = {
        connect: features.map(feature => ({
          id: feature
        }))
      };
    }

    // disconnect every feature, to handle removing features
    const previousFeatures = await ctx.prisma.ad({ id }).features();
    if (previousFeatures && previousFeatures.length > 0) {
      await ctx.prisma.updateAd({
        data: {
          features: {
            disconnect: previousFeatures.map(feature => ({ id: feature.id }))
          }
        },
        where: { id }
      });
    }

    return await ctx.prisma.updateAd({
      data: updatedData,
      where: { id }
    });
  },
  async deleteAd(parent, { id }, ctx) {
    const adCreator: User = await ctx.prisma.ad({ id }).creator();
    const userId = getUserId(ctx);

    if (!(adCreator.id === userId || getUserPermissions(ctx) === "ADMIN")) {
      throw UserNotCreatorError;
    }

    const statusOffer: OfferStatus = "DELETED";
    await ctx.prisma.updateManyOffers({
      data: { status: statusOffer },
      where: { ad: { id } }
    });

    const deletedAdStatus: AdStatus = "DELETED";
    return await ctx.prisma.updateAd({
      data: { status: deletedAdStatus },
      where: { id }
    });
  }
};
