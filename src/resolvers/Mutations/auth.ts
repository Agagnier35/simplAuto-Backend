import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context } from "../../utils";
import {
  InvalidPasswordError,
  InvalidEmailError
} from "../../errors/authErrors";

export const auth = {
  async signup(parent, args, ctx: Context) {
    // Lowercase the emails
    args.email = args.email.toLowerCase();
    // Set default permissions
    // We set USER as the default
    // role for a logged in user
    const permissions = ["USER"];

    args.permissions = {
      set: permissions
    };
    // Hash passwords
    const password = await bcrypt.hash(args.password, 10);
    // Finally create
    const user = await ctx.prisma.createUser({ ...args, password });

    // Create the JWT token for the user
    const token = jwt.sign(
      { userId: user.id, permissions },
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
