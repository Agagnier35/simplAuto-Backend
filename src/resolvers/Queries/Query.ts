import { getUserId, Context } from "../../utils";
import { UserNotFoundError } from "../../errors/userErrors";

export const Query = {
  async me(parent, args, ctx: Context) {
    const id = ctx.request.userId;

    if (id) {
      const userExists = await ctx.prisma.$exists.user({
        id
      });
      console.log("userExists");
      console.log(userExists);
      if (userExists) {
        return ctx.prisma.user({ id });
      }
    }

    return null;
  }
};
