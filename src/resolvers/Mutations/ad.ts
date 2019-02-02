import { getUserId, Context } from "../../utils";

export const ad = {
  async createAd(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { adFeatures, modelID, categoryID, manufacturerID, ...rest } = data;

    // TODO Maybe check if each relational object really exists in the db
    // TODO if not throw custom errors
    const mutation = {
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
