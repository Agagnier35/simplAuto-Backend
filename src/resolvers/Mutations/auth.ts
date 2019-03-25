import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { promisify } from "util";
import { Context, emailRegex, resetTokenExpiryTime } from "../../utils";
import {
  InvalidPasswordError,
  InvalidEmailError,
  InvalidEmailFormatError,
  TokenExpiredOrInvalidError,
  InvalidClientTypeData
} from "../../errors/authErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import {
  Permission,
  User,
  DateCreateOneInput
} from "../../generated/prisma-client";
import { UserCreateInput } from "../../generated/prisma-client/index";
import { createCustomer } from "../../stripe";
const sgMail = require("@sendgrid/mail");

interface AuthResolvers {
  signup: Types.SignupResolver;
  login: Types.LoginResolver;
  facebookLogin: Types.FacebookLoginResolver;
  googleLogin: Types.GoogleLoginResolver;
  logout: Types.LogoutResolver;
  resetPasswordRequest: Types.ResetPasswordRequestResolver;
  resetPassword: Types.ResetPasswordResolver;
}

const createBasicUser = (data: Types.UserSignupInput) => {
  let birthDate;
  data.email = data.email.toLowerCase();

  // We set USER as the default
  const basePermissions: Permission[] = ["USER"];

  const permissions = {
    set: basePermissions
  };

  const { name, longitude, latitude } = data.location;
  const location = {
    create: {
      name,
      longitude,
      latitude
    }
  };
  // Verify email format
  if (!emailRegex.test(data.email)) {
    throw InvalidEmailFormatError;
  }

  if (data.clientType === "INDIVIDUAL") {
    if (!data.firstName || !data.lastName || data.companyName) {
      throw InvalidClientTypeData;
    }

    const { day, month, year } = data.birthDate;

    birthDate = {
      create: {
        day,
        month,
        year
      }
    };
  } else if (data.clientType === "COMPANY") {
    if (data.firstName || data.lastName || !data.companyName) {
      throw InvalidClientTypeData;
    }
  }

  return {
    ...data,
    permissions,
    location,
    birthDate
  };
};

const createAndInjectToken = (user: User, ctx: Context) => {
  // Create the JWT token for the user
  const token = jwt.sign(
    { permissions: user.permissions, userId: user.id },
    process.env.APP_SECRET
  );

  // Set the JWT as a cookie on the response
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // Cookie will last 1 year
  });
};

export const auth: AuthResolvers = {
  async signup(parent, { data }, ctx: Context) {
    const userInput: UserCreateInput = createBasicUser(data);
    // Hash passwords
    userInput.password = await bcrypt.hash(data.password, 10);

    const user: User = await ctx.prisma.createUser(userInput);
    // Create stripe customer to track bills later on
    await createCustomer(user, ctx);

    createAndInjectToken(user, ctx);

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

    createAndInjectToken(user, ctx);

    return user;
  },

  async facebookLogin(parent, { data }, ctx: Context) {
    let user = await ctx.prisma.user({ facebookID: data.facebookID });
    if (!user) {
      const userInput = createBasicUser(data);
      user = await ctx.prisma.createUser(userInput);
      // Create stripe customer to track bills later on
      await createCustomer(user, ctx);
    }
    createAndInjectToken(user, ctx);
    return user;
  },

  async googleLogin(parent, { data }, ctx: Context) {
    let user = await ctx.prisma.user({ googleID: data.googleID });
    if (!user) {
      const userInput = createBasicUser(data);
      user = await ctx.prisma.createUser(userInput);
      // Create stripe customer to track bills later on
      await createCustomer(user, ctx);
    }
    createAndInjectToken(user, ctx);
    return user;
  },

  logout(parent, args, ctx: Context) {
    ctx.response.clearCookie("token");

    return "disconnected";
  },

  async resetPasswordRequest(parent, { email }, ctx: Context) {
    const user = await ctx.prisma.user({ email });

    if (!user) {
      throw InvalidEmailError;
    }

    const { firstName, lastName } = user;
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + resetTokenExpiryTime; // 30 min expiry

    await ctx.prisma.updateUser({
      data: { resetToken, resetTokenExpiry },
      where: { email }
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "simplauto@yopmail.com",
      subject: "Simplauto Reset password",
      templateId: "d-f7fe2f7bca064724b367e4a6271d7941",
      dynamic_template_data: {
        firstName,
        lastName,
        email,
        link: `${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}`
      }
    };
    sgMail.send(msg);

    return "resetPasswordRequestSent";
  },

  async resetPassword(parent, args, ctx: Context) {
    const { resetToken } = args;
    const [user] = await ctx.prisma.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - resetTokenExpiryTime
      }
    });

    if (!user) {
      throw TokenExpiredOrInvalidError;
    }

    const password = await bcrypt.hash(args.password, 10);

    const updatedUser = await ctx.prisma.updateUser({
      data: { password, resetToken: null, resetTokenExpiry: null },
      where: { email: user.email }
    });

    createAndInjectToken(user, ctx);
    return updatedUser;
  }
};
