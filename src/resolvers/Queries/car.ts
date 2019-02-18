import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface CarQueries {
  carFeatureCategories: QueryResolvers.CarFeatureCategoriesResolver;
  carFeatureCategory: QueryResolvers.CarFeatureCategoryResolver;
  manufacturers: QueryResolvers.ManufacturersResolver;
  carCategories: QueryResolvers.CarCategoriesResolver;
  car: QueryResolvers.CarResolver;
}

export const car: CarQueries = {
  car(parent, { id }, ctx: Context) {
    return ctx.prisma.car({ id });
  },
  carFeatureCategories(parent, args, ctx: Context) {
    return ctx.prisma.carFeatureCategories();
  },
  carFeatureCategory(parent, { name }, ctx: Context) {
    return ctx.prisma.carFeatureCategory({ name });
  },
  manufacturers(parent, args, ctx: Context) {
    return ctx.prisma.manufacturers();
  },
  carCategories(parent, args, ctx: Context) {
    return ctx.prisma.carCategories();
  }
};
