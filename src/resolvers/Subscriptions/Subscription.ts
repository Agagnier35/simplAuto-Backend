import { Context as Ctx, getUserId } from "../../utils";
import { Permission } from "../../generated/yoga-client";

interface Context extends Ctx {
  userId: string;
  permissions: [Permission];
}

export const Subscription = {
  messageSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      const userId = ctx.userId;

      return ctx.prisma.$subscribe
        .message({
          mutation_in: ["CREATED"],
          node: {
            conversation: {
              buyer: {
                id: userId
              },
              seller: {
                id: userId
              }
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
