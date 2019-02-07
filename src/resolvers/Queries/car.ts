import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface CarQueries {
  carFeatureCategories: QueryResolvers.CarFeatureCategoriesResolver;
  manufacturers: QueryResolvers.ManufacturersResolver;
  carCategories: QueryResolvers.CarCategoriesResolver;
}

export const car: CarQueries = {
  carFeatureCategories(parent, args, ctx: Context) {
    return ctx.prisma.carFeatureCategories();
  },
  manufacturers(parent, args, ctx: Context) {
    return ctx.prisma.manufacturers();
  },
  carCategories(parent, args, ctx: Context) {
    return ctx.prisma.carCategories();
  }
};
