import { getUserId, Context } from "../../utils";
import { UserNotFoundError } from "../../errors/userErrors";

export const user = {
  async updateUser(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { id, ...updatedValues } = data;

    const userExists = await ctx.prisma.$exists.user({
      id: userId
    });
    if (!userExists) {
      throw UserNotFoundError;
    }

    return ctx.prisma.updateUser({
      where: { id },
      data: { ...updatedValues }
    });
  }
};
