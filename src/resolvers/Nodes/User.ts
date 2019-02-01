import { Context } from "../../utils";

export const User = {
  cars: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).cars();
  },

  ads: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).ads();
  },

  offers: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).offers();
  }
};
