import { getUserId, Context, emailRegex } from "../../utils";
import { UserNotFoundError } from "../../errors/userErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { UserUpdateInput } from "../../generated/prisma-client/index";
import { InvalidEmailFormatError } from "../../errors/authErrors";
import * as bcrypt from "bcryptjs";

interface UserResolvers {
  updateUser: Types.UpdateUserResolver;
}

export const user: UserResolvers = {
  async updateUser(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const {
      id,
      permissions,
      birthDate,
      password,
      location,
      ...updatedValues
    } = data;

    const userExists = await ctx.prisma.$exists.user({
      id: userId
    });
    if (!userExists) {
      throw UserNotFoundError;
    }

    const updatedData: UserUpdateInput = updatedValues;

    if (data.birthDate) {
      const { day, month, year } = data.birthDate;
      const newBirthDate = {
        create: {
          day,
          month,
          year
        }
      };
      updatedData.birthDate = newBirthDate;
    }
    if (data.location) {
      const { name, longitude, latitude } = data.location;
      const newLocation = {
        create: {
          name,
          longitude,
          latitude
        }
      };
      updatedData.location = newLocation;
    }

    if (updatedValues.email && !emailRegex.test(updatedValues.email)) {
      throw InvalidEmailFormatError;
    }

    if (permissions) {
      updatedData.permissions = {
        set: permissions
      };
    }

    if (password) {
      const newPassword = await bcrypt.hash(data.password, 10);
      updatedData.password = newPassword;
    }

    return ctx.prisma.updateUser({
      where: { id },
      data: updatedData
    });
  }
};
