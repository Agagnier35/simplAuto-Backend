import { Context as Ctx, getUserId } from "../../utils";
import { Permission } from "../../generated/yoga-client";

interface Context extends Ctx {
  userId?: string;
  permissions: [Permission];
  connection?: any;
}

export const Subscription = {
  messageSubscription: {
    subscribe: async (parent, { conversationID }, ctx: Context) => {
      let userId;
      console.log("object");
      if (ctx.userId) {
        // Playground
        userId = userId;
      } else if (ctx.connection) {
        // App
        userId = ctx.connection.context.userId;
      }

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
