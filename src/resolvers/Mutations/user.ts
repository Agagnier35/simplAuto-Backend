import { getUserId, Context, emailRegex } from "../../utils";
import { UserNotFoundError, BanningUserError } from "../../errors/userErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { UserUpdateInput } from "../../generated/prisma-client/index";
import {
  InvalidEmailFormatError,
  NotAnAdminError
} from "../../errors/authErrors";
import * as bcrypt from "bcryptjs";

interface UserResolvers {
  updateUser: Types.UpdateUserResolver;
  banUser: Types.BanUserResolver;
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
  },
  async banUser(parent, { id }, ctx: Context) {
    const userID = getUserId(ctx);

    const permissions = await ctx.prisma.user({ id: userID }).permissions();

    if (!permissions.includes("ADMIN")) {
      throw NotAnAdminError;
    }

    try {
      const user = await ctx.prisma.updateUser({
        where: {
          id
        },
        data: {
          status: "BANNED"
        }
      });

      // Delete all ads
      await ctx.prisma.updateManyAds({
        where: {
          creator: {
            id
          }
        },
        data: {
          status: "DELETED"
        }
      });

      // Delete all offers
      await ctx.prisma.updateManyOffers({
        where: {
          creator: {
            id
          }
        },
        data: {
          status: "DELETED"
        }
      });

      return user;
    } catch (error) {
      throw BanningUserError;
    }
  }
};
