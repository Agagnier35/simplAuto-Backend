import { Prisma } from "../../generated/prisma-client";
import createMockInstance from "jest-create-mock-instance";
import * as Utils from "../../utils";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { auth as AuthMutationResolver } from "../Mutations/auth";
import { MutationResolvers as Types } from "../../generated/yoga-client";
import { getNotLoggedInContext } from "../../testUtils";
import {
  InvalidEmailFormatError,
  InvalidClientTypeData,
  InvalidPasswordError,
  InvalidEmailError
} from "../../errors/authErrors";
jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => "encryptedPWD"),
  compare: jest.fn((pwd, pwd2) => pwd === pwd2)
}));
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn()
}));
jest.mock("../../stripe");

let prisma: jest.Mocked<Prisma>;
describe("Auth mutations tests suite", () => {
  beforeEach(() => {
    prisma = createMockInstance(Prisma);
    jest.clearAllMocks();
    Utils.emailRegex.test = jest.fn(() => true);
  });

  describe("Signup test suite", () => {
    const basicIndividualSignup: Types.ArgsSignup = {
      data: {
        email: "JESUS@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "secret42",
        location: { name: "Lost", longitude: 9, latitude: 10 },
        radius: 9999,
        birthDate: {
          day: 1,
          month: 1,
          year: 1
        },
        gender: "MALE"
      }
    };

    beforeEach(() => {
      prisma.createUser = jest.fn().mockReturnValue(() => ({
        permissions: "USER",
        id: "someUserId"
      }));
    });

    test("When creating user, Then encrypt password", async () => {
      await AuthMutationResolver.signup(
        undefined,
        basicIndividualSignup,
        getNotLoggedInContext(prisma),
        undefined
      );
      expect(bcrypt.hash).toBeCalledTimes(1);
    });

    test("When creating user, Then create user into Prisma", async () => {
      await AuthMutationResolver.signup(
        undefined,
        basicIndividualSignup,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.createUser).toBeCalledWith({
        email: "jesus@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "encryptedPWD",
        location: { create: { name: "Lost", longitude: 9, latitude: 10 } },
        radius: 9999,
        birthDate: {
          create: {
            day: 1,
            month: 1,
            year: 1
          }
        },
        gender: "MALE",
        permissions: { set: ["USER"] }
      });
    });

    test("When creating user, Then create token and set into response", async () => {
      const ctx = getNotLoggedInContext(prisma);
      await AuthMutationResolver.signup(
        undefined,
        basicIndividualSignup,
        ctx,
        undefined
      );

      expect(jwt.sign).toBeCalledTimes(1);
      expect(ctx.response.cookie).toBeCalledTimes(1);
    });

    test("With invalid email, When creating user, Then throw error", async () => {
      Utils.emailRegex.test = jest.fn(() => false);

      await expect(
        AuthMutationResolver.signup(
          undefined,
          basicIndividualSignup,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidEmailFormatError);
    });

    test("With clientType individual, When signup, Then first and last name cannot be null", async () => {
      const invalidIndividualSignup: Types.ArgsSignup = {
        data: {
          email: "JESUS@yopmail.com",
          clientType: "INDIVIDUAL",
          password: "secret42",
          location: { name: "Lost", longitude: 9, latitude: 10 },
          radius: 9999,
          birthDate: {
            day: 1,
            month: 1,
            year: 1
          },
          gender: "MALE"
        }
      };

      await expect(
        AuthMutationResolver.signup(
          undefined,
          invalidIndividualSignup,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidClientTypeData);
    });

    test("With clientType individual, When signup, Then companyName must be null", async () => {
      const invalidIndividualSignup: Types.ArgsSignup = {
        data: {
          email: "JESUS@yopmail.com",
          clientType: "INDIVIDUAL",
          firstName: "Jesus",
          lastName: "Christ",
          companyName: "Jew Inc.",
          password: "secret42",
          location: { name: "Lost", longitude: 9, latitude: 10 },
          radius: 9999,
          birthDate: {
            day: 1,
            month: 1,
            year: 1
          },
          gender: "MALE"
        }
      };

      await expect(
        AuthMutationResolver.signup(
          undefined,
          invalidIndividualSignup,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidClientTypeData);
    });

    test("With clientType company, When signup, Then first and last name must be null", async () => {
      const invalidCompanySignup: Types.ArgsSignup = {
        data: {
          email: "JESUS@yopmail.com",
          clientType: "COMPANY",
          firstName: "Jesus",
          lastName: "Christ",
          companyName: "Jew Inc.",
          password: "secret42",
          location: { name: "Lost", longitude: 9, latitude: 10 },
          radius: 9999,
          birthDate: {
            day: 1,
            month: 1,
            year: 1
          },
          gender: "MALE"
        }
      };

      await expect(
        AuthMutationResolver.signup(
          undefined,
          invalidCompanySignup,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidClientTypeData);
    });

    test("With clientType company, When signup, Then companyName cannot be null", async () => {
      const invalidCompanySignup: Types.ArgsSignup = {
        data: {
          email: "JESUS@yopmail.com",
          clientType: "COMPANY",
          password: "secret42",
          location: { name: "Lost", longitude: 9, latitude: 10 },
          radius: 9999,
          birthDate: {
            day: 1,
            month: 1,
            year: 1
          },
          gender: "MALE"
        }
      };

      await expect(
        AuthMutationResolver.signup(
          undefined,
          invalidCompanySignup,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidClientTypeData);
    });
  });

  describe("Login test suite", () => {
    beforeEach(() => {
      prisma.user = jest.fn().mockReturnValue({
        password: "secret42"
      });
    });

    const loginInput: Types.ArgsLogin = {
      email: "JESUS@yopmail.com",
      password: "secret42"
    };

    test("When Login, Then fetch user in Prisma", async () => {
      await AuthMutationResolver.login(
        undefined,
        loginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.user).toBeCalledTimes(1);
    });

    test("When Login, Then compare passwords", async () => {
      await AuthMutationResolver.login(
        undefined,
        loginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(bcrypt.compare).toBeCalledTimes(1);
    });

    test("When login user, Then create token and set into response", async () => {
      const ctx = getNotLoggedInContext(prisma);
      await AuthMutationResolver.login(undefined, loginInput, ctx, undefined);

      expect(jwt.sign).toBeCalledTimes(1);
      expect(ctx.response.cookie).toBeCalledTimes(1);
    });

    test("With wrong password, When Login, Then throw error", async () => {
      const loginWrongPwdInput: Types.ArgsLogin = {
        email: "JESUS@yopmail.com",
        password: "bybye"
      };

      await expect(
        AuthMutationResolver.login(
          undefined,
          loginWrongPwdInput,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidPasswordError);
    });

    test("With no user matching input, When Login, Then throw error", async () => {
      prisma.user = jest.fn();

      await expect(
        AuthMutationResolver.login(
          undefined,
          loginInput,
          getNotLoggedInContext(prisma),
          undefined
        )
      ).rejects.toThrowError(InvalidEmailError);
    });
  });

  describe("Facebook test suite", () => {
    beforeEach(() => {
      prisma.user = jest
        .fn()
        .mockReturnValue(() => ({ id: "userID", permissions: ["USER"] }));
      prisma.createUser = jest
        .fn()
        .mockReturnValue(() => ({ id: "userID", permissions: ["USER"] }));
    });

    const facebookLoginInput: Types.ArgsFacebookLogin = {
      data: {
        email: "JESUS@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "secret42",
        location: { name: "Lost", longitude: 9, latitude: 10 },
        radius: 9999,
        birthDate: {
          day: 1,
          month: 1,
          year: 1
        },
        gender: "MALE",
        facebookID: "fbID"
      }
    };

    test("When doing auth via Facebook, Then look for a user with ID", async () => {
      await AuthMutationResolver.facebookLogin(
        undefined,
        facebookLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.user).toBeCalledWith({
        facebookID: "fbID"
      });
    });

    test("With no user, When doing auth via Facebook, Then create a user", async () => {
      prisma.user = jest.fn();
      await AuthMutationResolver.facebookLogin(
        undefined,
        facebookLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.createUser).toBeCalledWith({
        email: "jesus@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "secret42",
        location: { create: { name: "Lost", longitude: 9, latitude: 10 } },
        radius: 9999,
        birthDate: {
          create: {
            day: 1,
            month: 1,
            year: 1
          }
        },
        gender: "MALE",
        facebookID: "fbID",
        permissions: { set: ["USER"] }
      });
    });

    test("With a existing user, When doing auth via Facebook, Then no need to create a user", async () => {
      await AuthMutationResolver.facebookLogin(
        undefined,
        facebookLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.createUser).toBeCalledTimes(0);
    });

    test("When doing auth via Facebook, Then create token and set into response", async () => {
      const ctx = getNotLoggedInContext(prisma);
      await AuthMutationResolver.facebookLogin(
        undefined,
        facebookLoginInput,
        ctx,
        undefined
      );

      expect(jwt.sign).toBeCalledTimes(1);
      expect(ctx.response.cookie).toBeCalledTimes(1);
    });
  });

  describe("Google test suite", () => {
    beforeEach(() => {
      prisma.user = jest
        .fn()
        .mockReturnValue(() => ({ id: "userID", permissions: ["USER"] }));
      prisma.createUser = jest
        .fn()
        .mockReturnValue(() => ({ id: "userID", permissions: ["USER"] }));
    });

    const googleLoginInput: Types.ArgsGoogleLogin = {
      data: {
        email: "JESUS@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "secret42",
        location: { name: "Lost", longitude: 9, latitude: 10 },
        radius: 9999,
        birthDate: {
          day: 1,
          month: 1,
          year: 1
        },
        gender: "MALE",
        googleID: "googleID"
      }
    };

    test("When doing auth via Google, Then look for a user with ID", async () => {
      await AuthMutationResolver.googleLogin(
        undefined,
        googleLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.user).toBeCalledWith({
        googleID: "googleID"
      });
    });

    test("With no user, When doing auth via Google, Then create a user", async () => {
      prisma.user = jest.fn();
      await AuthMutationResolver.googleLogin(
        undefined,
        googleLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.createUser).toBeCalledWith({
        email: "jesus@yopmail.com",
        clientType: "INDIVIDUAL",
        firstName: "Jesus",
        lastName: "Christ",
        password: "secret42",
        location: { create: { name: "Lost", longitude: 9, latitude: 10 } },
        radius: 9999,
        birthDate: {
          create: {
            day: 1,
            month: 1,
            year: 1
          }
        },
        gender: "MALE",
        googleID: "googleID",
        permissions: { set: ["USER"] }
      });
    });

    test("With a existing user, When doing auth via Google, Then no need to create a user", async () => {
      await AuthMutationResolver.googleLogin(
        undefined,
        googleLoginInput,
        getNotLoggedInContext(prisma),
        undefined
      );

      expect(prisma.createUser).toBeCalledTimes(0);
    });

    test("When doing auth via Google, Then create token and set into response", async () => {
      const ctx = getNotLoggedInContext(prisma);
      await AuthMutationResolver.googleLogin(
        undefined,
        googleLoginInput,
        ctx,
        undefined
      );

      expect(jwt.sign).toBeCalledTimes(1);
      expect(ctx.response.cookie).toBeCalledTimes(1);
    });
  });
});
