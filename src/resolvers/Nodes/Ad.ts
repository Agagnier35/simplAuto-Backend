import { Context } from "../../utils";

export const Ad = {
  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).creator();
  },

  offers: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).offers();
  },

  features: ({ id }, args, ctx: Context) => {
    return ctx.prisma.ad({ id }).features();
  }
};
