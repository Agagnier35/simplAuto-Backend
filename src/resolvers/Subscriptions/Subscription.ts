import { Context } from "../../utils";

export const Subscription = {
  messageSubscription: {
    subscribe: async (parent, { conversationID }, ctx: Context) => {
      return ctx.prisma.$subscribe
        .message({
          mutation_in: ["CREATED"],
          node: {
            conversation: {
              id: conversationID
            }
          }
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
};
