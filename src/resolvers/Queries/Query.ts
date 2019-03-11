import { getUserId, Context } from "../../utils";

export const Query = {
  me(parent, args, ctx: Context) {
    const id = ctx.request.userId;
    if (id) {
      return ctx.prisma.user({ id });
    }
    return null;
  }
};
