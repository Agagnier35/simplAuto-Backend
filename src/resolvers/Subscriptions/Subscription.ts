import { Context, getUserId } from "../../utils";

export const Subscription = {
  messageSubscription: {
    subscribe: async (parent, args, ctx: Context) => {
      const userID = getUserId(ctx);

      return ctx.prisma.$subscribe
        .message({
          mutation_in: ["CREATED"],
          OR: [
            {
              node: {
                conversation: {
                  buyer: {
                    id: userID
                  }
                }
              }
            },
            {
              node: {
                conversation: {
                  seller: {
                    id: userID
                  }
                }
              }
            }
          ]
        })
        .node();
    },
    resolve: payload => {
      return payload;
    }
  }
};
