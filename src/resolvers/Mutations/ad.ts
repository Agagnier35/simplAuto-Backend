import { getUserId } from "../../utils";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { AdCreateInput } from "../../generated/prisma-client/index";

interface AdResolvers {
  createAd: Types.CreateAdResolver;
}

export const ad: AdResolvers = {
  async createAd(parent, { data }, ctx, info) {
    const userId = getUserId(ctx);
    const { adFeatures, modelID, categoryID, manufacturerID, ...rest } = data;

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

    if (adFeatures && adFeatures.length > 0) {
      mutation.features = {
        create: adFeatures.map(feature => ({
          feature: { connect: { id: feature.featureID } },
          importance: feature.importance
        }))
      };
    }

    return ctx.prisma.createAd(mutation);
  }
};
