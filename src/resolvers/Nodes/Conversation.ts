import { ConversationResolvers } from "../../generated/yoga-client";
import { Context } from "../../utils";

export const Conversation: ConversationResolvers.Type = {
  ...ConversationResolvers.defaultResolvers,

  buyer: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).buyer();
  },

  seller: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).seller();
  },

  offer: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).offer();
  },

  messages: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversation({ id }).messages();
  },
  messageCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .messagesConnection({
        where: {
          conversation: {
            id
          }
        }
      })
      .aggregate()
      .count();
  }
};
