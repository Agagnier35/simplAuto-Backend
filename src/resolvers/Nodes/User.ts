import { Context } from "../../utils";
import { UserResolvers } from "../../generated/yoga-client";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  birthDate: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).birthDate();
  },

  cars: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).cars({
      where: {
        status: "PUBLISHED"
      }
    });
  },

  ads: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).ads({
      where: {
        status: "PUBLISHED"
      }
    });
  },

  offers: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).offers();
  },

  conversations: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).conversations();
  }
};
