import { Context } from "../../utils";
import { OfferResolvers } from "../../generated/yoga-client";

export const Offer: OfferResolvers.Type = {
  ...OfferResolvers.defaultResolvers,

  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).creator();
  },

  ad: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).ad();
  },

  car: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).car();
  },

  conversation: async ({ id }, args, ctx: Context) => {
    const conversation = await ctx.prisma.offer({ id }).conversation();
    if(conversation.status === "DELETED") return;
    return conversation;
  },
  addons: ({ id }, args, ctx: Context) => {
    return ctx.prisma.offer({ id }).addons();
  }
};
