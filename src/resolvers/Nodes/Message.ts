import { Context } from "../../utils";
import { MessageResolvers } from "../../generated/yoga-client";

export const Message: MessageResolvers.Type = {
  ...MessageResolvers.defaultResolvers,

  sender: ({ id }, args, ctx: Context) => {
    return ctx.prisma.message({ id }).sender();
  },

  conversation: ({ id }, args, ctx: Context) => {
    return ctx.prisma.message({ id }).conversation();
  }
};
