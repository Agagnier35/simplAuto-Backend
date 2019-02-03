import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context } from "../../utils";
import {
  InvalidPasswordError,
  InvalidEmailError
} from "../../errors/authErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { Permission } from "../../generated/prisma-client";
import { UserCreateInput } from "../../generated/prisma-client/index";

interface AuthResolvers {
  signup: Types.SignupResolver;
  login: Types.LoginResolver;
}

export const auth: AuthResolvers = {
  async signup(parent, { data }, ctx: Context) {
    // Lowercase the emails
    data.email = data.email.toLowerCase();

    // Set default permissions
    // We set USER as the default
    // role for a logged in user
    const basePermissions: Permission[] = ["USER"];

    const permissions = {
      set: basePermissions
    };

    // Hash passwords
    const password = await bcrypt.hash(data.password, 10);

    // Finally create
    const userInput: UserCreateInput = { ...data, password, permissions };
    const user = await ctx.prisma.createUser(userInput);

    // Create the JWT token for the user
    const token = jwt.sign(
      { permissions: basePermissions, userId: user.id },
      process.env.APP_SECRET
    );

    // Set the JWT as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // Cookie will last 1 year
    });

    return user;
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user({ email: email.toLowerCase() });

    if (!user) {
      throw InvalidEmailError;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw InvalidPasswordError;
    }

    // Same token flow as signup...
    const token = jwt.sign(
      { userId: user.id, permissions: user.permissions },
      process.env.APP_SECRET
    );

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  }
};
