import { Context } from "../../utils";
import { PostResolvers } from "../../generated/yoga-client";

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,

  author: ({ id }, args, ctx: Context) => {
    return ctx.prisma.post({ id }).author();
  }
};
