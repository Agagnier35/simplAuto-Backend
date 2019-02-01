import { Context } from "../../utils";

export const CarFeatureCategory = {
  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.carFeatureCategory({ id }).features();
  }
};
