import { getUserId, Context } from "../../utils";
import {
  MutationResolvers as Types,
  AdStatus
} from "../../generated/yoga-client";
import {
  AdCreateInput,
  OfferStatus,
  AdUpdateInput
} from "../../generated/prisma-client/index";

interface AdResolvers {
  createAd: Types.CreateAdResolver;
  updateAd: Types.UpdateAdResolver;
  deleteAd: Types.DeleteAdResolver;
}

export const ad: AdResolvers = {
  async createAd(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { manufacturerID, modelID, categoryID, features, ...rest } = data;
    // TODO Maybe check if each relational object really exists in the db
    // TODO if not throw custom errors
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
    const { id, manufacturerID, modelID, categoryID, features, ...rest } = data;

    const updatedData: AdUpdateInput = {
      ...rest
    };

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
    await ctx.prisma.updateAd({
      data: {
        features: {
          disconnect: previousFeatures.map(feature => ({ id: feature.id }))
        }
      },
      where: { id }
    });

    return await ctx.prisma.updateAd({
      data: updatedData,
      where: { id }
    });
  },
  async deleteAd(parent, { id }, ctx) {
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
