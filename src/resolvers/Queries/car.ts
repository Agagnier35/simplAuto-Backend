import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface CarQueries {
  carFeatureCategories: QueryResolvers.CarFeatureCategoriesResolver;
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
  manufacturers(parent, args, ctx: Context) {
    return ctx.prisma.manufacturers();
  },
  carCategories(parent, args, ctx: Context) {
    return ctx.prisma.carCategories();
  }
};
