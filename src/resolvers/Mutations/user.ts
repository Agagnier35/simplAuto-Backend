import { getUserId, Context, emailRegex } from "../../utils";
import { UserNotFoundError } from "../../errors/userErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { UserUpdateInput } from "../../generated/prisma-client/index";
import { InvalidEmailFormatError } from "../../errors/authErrors";

interface UserResolvers {
  updateUser: Types.UpdateUserResolver;
}

export const user: UserResolvers = {
  async updateUser(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { id, permissions, ...updatedValues } = data;

    const userExists = await ctx.prisma.$exists.user({
      id: userId
    });
    if (!userExists) {
      throw UserNotFoundError;
    }

    const { day, month, year } = data.birthDate;
    const birthDate = {
      create: {
        day,
        month,
        year
      }
    };

    const updatedData: UserUpdateInput = { ...updatedValues, birthDate };

    if (updatedValues.email && !emailRegex.test(updatedValues.email)) {
      throw InvalidEmailFormatError;
    }

    if (permissions) {
      updatedData.permissions = {
        set: permissions
      };
    }

    return ctx.prisma.updateUser({
      where: { id },
      data: updatedData
    });
  }
};
