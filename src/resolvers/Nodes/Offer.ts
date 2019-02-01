import { Context } from "../../utils";

export const Offer = {
  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).creator();
  },

  ad: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).ad();
  },

  car: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).car();
  }
};
