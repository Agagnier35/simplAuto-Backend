import { Context } from "../../utils";

export const CarFeature = {
  category: ({ id }, args, ctx: Context) => {
    return ctx.prisma.carFeature({ id }).category();
  }
};
