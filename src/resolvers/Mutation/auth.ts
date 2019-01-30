import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context } from "../../utils";

export const auth = {
  async signup(parent, args, ctx: Context) {
    // Lowercase the emails
    args.email = args.email.toLowerCase();
    // Set default permissions
    // We set USER as the default
    // role for a logged in user
    args.permissions = {
      set: ["USER"]
    };
    // Hash passwords
    const password = await bcrypt.hash(args.password, 10);
    // Finally create
    const user = await ctx.prisma.createUser({ ...args, password });

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  },

  async login(parent, { email, password }, ctx: Context) {
    const user = await ctx.prisma.user({ email: email.toLowerCase() });

    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    // Sign the token with the app secret
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    };
  }
};
