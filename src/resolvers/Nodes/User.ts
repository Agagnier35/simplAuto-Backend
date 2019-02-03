import { Context } from "../../utils";
import { UserResolvers } from "../../generated/yoga-client";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

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
