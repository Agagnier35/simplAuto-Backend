import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";

interface CarQueries {
  car: QueryResolvers.CarResolver;
}

export const car: CarQueries = {
  car(parent, { id }, ctx: Context) {
    return ctx.prisma.car({ id });
  }
};
