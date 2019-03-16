import { getUserId, Context, emailRegex } from "../../utils";
import { UserNotFoundError } from "../../errors/userErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { UserUpdateInput } from "../../generated/prisma-client/index";
import { InvalidEmailFormatError } from "../../errors/authErrors";
import * as bcrypt from "bcryptjs";
import stripe from "../../stripe";

interface UserResolvers {
  updateUser: Types.UpdateUserResolver;
  goPremium: Types.GoPremiumResolver;
}

export const user: UserResolvers = {
  async updateUser(parent, { data }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const { id, permissions, birthDate, password, ...updatedValues } = data;

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
  async goPremium(parent, { stripeToken }, ctx: Context, info) {
    const id = getUserId(ctx);

    const permissions = await ctx.prisma.user({ id }).permissions();
    permissions.push("PREMIUM");

    const charge = await stripe.charges.create({
      amount: 1000,
      currency: "CAD",
      source: stripeToken
    });

    return ctx.prisma.updateUser({
      where: { id },
      data: {
        permissions: {
          set: permissions
        }
      }
    });
  }
};
