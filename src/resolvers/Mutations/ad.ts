import { getUserId } from "../../utils";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { AdCreateInput } from "../../generated/prisma-client/index";

interface AdResolvers {
  createAd: Types.CreateAdResolver;
}

export const ad: AdResolvers = {
  async createAd(parent, { data }, ctx, info) {
    const userId = getUserId(ctx);
    const {
      priceLowerBoundFeature,
      priceHigherBoundFeature,
      manufacturerFeature,
      modelFeature,
      categoryFeature,
      mileageLowerBoundFeature,
      mileageHigherBoundFeature,
      yearLowerBoundFeature,
      yearHigherBoundFeature,
      features,
      ...rest
    } = data;

    // TODO Maybe check if each relational object really exists in the db
    // TODO if not throw custom errors
    const mutation: AdCreateInput = {
      ...rest,
      creator: {
        connect: { id: userId }
      }
    };

    if (manufacturerFeature) {
      mutation.manufacturerFeature = {
        create: {
          manufacturer: {
            connect: { id: manufacturerFeature.manufacturerID }
          },
          importance: manufacturerFeature.importance
        }
      };
    }

    if (modelFeature) {
      mutation.modelFeature = {
        create: {
          model: {
            connect: { id: modelFeature.modelID }
          },
          importance: modelFeature.importance
        }
      };
    }

    if (categoryFeature) {
      mutation.categoryFeature = {
        create: {
          category: {
            connect: { id: categoryFeature.categoryID }
          },
          importance: categoryFeature.importance
        }
      };
    }

    if (priceLowerBoundFeature) {
      mutation.priceLowerBoundFeature = {
        create: {
          price: priceLowerBoundFeature.price,
          importance: priceLowerBoundFeature.importance
        }
      };
    }

    if (priceHigherBoundFeature) {
      mutation.priceHigherBoundFeature = {
        create: {
          price: priceHigherBoundFeature.price,
          importance: priceHigherBoundFeature.importance
        }
      };
    }

    if (mileageHigherBoundFeature) {
      mutation.mileageHigherBoundFeature = {
        create: {
          mileage: mileageHigherBoundFeature.mileage,
          importance: mileageHigherBoundFeature.importance
        }
      };
    }

    if (mileageHigherBoundFeature) {
      mutation.mileageHigherBoundFeature = {
        create: {
          mileage: mileageHigherBoundFeature.mileage,
          importance: mileageHigherBoundFeature.importance
        }
      };
    }

    if (yearHigherBoundFeature) {
      mutation.yearHigherBoundFeature = {
        create: {
          year: yearHigherBoundFeature.year,
          importance: yearHigherBoundFeature.importance
        }
      };
    }

    if (yearHigherBoundFeature) {
      mutation.yearHigherBoundFeature = {
        create: {
          year: yearHigherBoundFeature.year,
          importance: yearHigherBoundFeature.importance
        }
      };
    }

    if (features && features.length > 0) {
      mutation.features = {
        create: features.map(feature => ({
          feature: { connect: { id: feature.featureID } },
          importance: feature.importance
        }))
      };
    }

    return ctx.prisma.createAd(mutation);
  }
};
