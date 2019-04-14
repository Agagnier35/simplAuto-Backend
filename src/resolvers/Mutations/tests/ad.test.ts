import * as Utils from "../../../utils";
import { ad as AdMutationResolver } from "../ad";
import {
  getUserContext,
  getAdminContext,
  getContextWithId
} from "../../../testUtils";
import { createMockInstance } from "jest-create-mock-instance";
import { Prisma } from "../../../generated/prisma-client";
import {
  InvalidPriceBoundsError,
  InvalidYearBoundsError,
  InvalidMileageBoundsError
} from "../../../errors/adErrors";
import { UserNotCreatorError } from "../../../errors/authErrors";

let prisma: jest.Mocked<Prisma>;
describe("Ads mutations tests suite", () => {
  beforeEach(() => {
    prisma = createMockInstance(Prisma);
  });

  describe("Ad create test suite", () => {
    beforeEach(() => {
      prisma.createAd = jest.fn();
    });

    test("When creating an Ad, Then fetch userID", async () => {
      const userSpy = jest.spyOn(Utils, "getUserId");

      const createAdInput = { data: {} };
      await AdMutationResolver.createAd(
        undefined,
        createAdInput,
        getUserContext(prisma),
        undefined
      );
      expect(userSpy).toHaveBeenCalledTimes(1);
    });

    test("When creating an Ad, Then pass the user id to Prisma", async () => {
      const ctx = getUserContext(prisma);

      const createAdInput = { data: {} };

      await AdMutationResolver.createAd(
        undefined,
        createAdInput,
        ctx,
        undefined
      );

      expect(prisma.createAd).toBeCalledWith({
        creator: { connect: { id: ctx.request.userId } }
      });
    });

    test("With a complete Ad input, When creating the Ad, then create or connect everything in Prisma", async () => {
      const ctx = getUserContext(prisma);

      const createAdInput = {
        data: {
          priceLowerBound: 99,
          priceHigherBound: 99,
          manufacturerID: "ID1",
          modelID: "ID2",
          categoryID: "ID3",
          mileageLowerBound: 99,
          mileageHigherBound: 99,
          yearLowerBound: 2000,
          yearHigherBound: 2001,
          features: ["someID", "someID2"]
        }
      };

      await AdMutationResolver.createAd(
        undefined,
        createAdInput,
        ctx,
        undefined
      );

      expect(prisma.createAd).toBeCalledWith({
        creator: { connect: { id: ctx.request.userId } },
        priceLowerBound: 99,
        priceHigherBound: 99,
        manufacturer: { connect: { id: "ID1" } },
        model: { connect: { id: "ID2" } },
        category: { connect: { id: "ID3" } },
        mileageLowerBound: 99,
        mileageHigherBound: 99,
        yearLowerBound: 2000,
        yearHigherBound: 2001,
        features: { connect: [{ id: "someID" }, { id: "someID2" }] }
      });
    });

    describe("When Creating Ad, Then the lower bound cannot be higher than higher bound", () => {
      test("Price:", async () => {
        const ctx = getUserContext(prisma);

        const createAdInput = {
          data: {
            priceLowerBound: 78,
            priceHigherBound: 12
          }
        };

        await expect(
          AdMutationResolver.createAd(undefined, createAdInput, ctx, undefined)
        ).rejects.toThrowError(InvalidPriceBoundsError);
      });

      test("Year:", async () => {
        const ctx = getUserContext(prisma);

        const createAdInput = {
          data: {
            yearLowerBound: 78,
            yearHigherBound: 12
          }
        };

        await expect(
          AdMutationResolver.createAd(undefined, createAdInput, ctx, undefined)
        ).rejects.toThrowError(InvalidYearBoundsError);
      });

      test("Milleage:", async () => {
        const ctx = getUserContext(prisma);

        const createAdInput = {
          data: {
            mileageLowerBound: 78,
            mileageHigherBound: 12
          }
        };

        await expect(
          AdMutationResolver.createAd(undefined, createAdInput, ctx, undefined)
        ).rejects.toThrowError(InvalidMileageBoundsError);
      });
    });
  });

  describe("update Ad test suite", () => {
    beforeEach(() => {
      prisma.updateAd = jest.fn();
    });

    test("When updating Ad, Then only owner or Admin is allowed", async () => {
      prisma.ad = jest.fn().mockReturnValue({
        creator: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" })),
        features: jest.fn(() => [])
      }); // user used in testUtils
      const updateAdInput = { data: { id: "someAdId" } };

      const userCtx = getUserContext(prisma);
      const adminCtx = getAdminContext(prisma);
      const badCtx = getContextWithId(prisma, "randomUserId");

      const expectedEmptyData = {
        priceLowerBound: null,
        priceHigherBound: null,
        manufacturer: { disconnect: true },
        model: { disconnect: true },
        category: { disconnect: true },
        mileageLowerBound: null,
        mileageHigherBound: null,
        yearLowerBound: null,
        yearHigherBound: null
      };

      // user
      await AdMutationResolver.updateAd(
        undefined,
        updateAdInput,
        userCtx,
        undefined
      );
      expect(prisma.updateAd).toBeCalledWith({
        data: expectedEmptyData,
        where: { id: "someAdId" }
      });

      // admin
      await AdMutationResolver.updateAd(
        undefined,
        updateAdInput,
        adminCtx,
        undefined
      );
      expect(prisma.updateAd).toBeCalledWith({
        data: expectedEmptyData,
        where: { id: "someAdId" }
      });

      // wrong user
      await expect(
        AdMutationResolver.updateAd(undefined, updateAdInput, badCtx, undefined)
      ).rejects.toThrowError(UserNotCreatorError);
    });

    test("With ad features, When updating ad, Then disconnect and reconnect features", async () => {
      prisma.ad = jest.fn().mockReturnValue({
        creator: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" })),
        features: jest.fn(() => [{ id: "ad3" }, { id: "ad1" }])
      }); // user used in testUtils

      const updateAdInput = {
        data: { id: "someAdId", features: ["ad1", "ad2"] }
      };

      const userCtx = getUserContext(prisma);
      await AdMutationResolver.updateAd(
        undefined,
        updateAdInput,
        userCtx,
        undefined
      );

      expect(prisma.updateAd).toHaveBeenNthCalledWith(1, {
        data: { features: { disconnect: [{ id: "ad3" }, { id: "ad1" }] } },
        where: { id: "someAdId" }
      });

      expect(prisma.updateAd).toHaveBeenNthCalledWith(2, {
        data: {
          priceLowerBound: null,
          priceHigherBound: null,
          manufacturer: { disconnect: true },
          model: { disconnect: true },
          category: { disconnect: true },
          mileageLowerBound: null,
          mileageHigherBound: null,
          yearLowerBound: null,
          yearHigherBound: null,
          features: { connect: [{ id: "ad1" }, { id: "ad2" }] }
        },
        where: { id: "someAdId" }
      });
    });
  });

  describe("delete ad test suite", () => {
    beforeEach(() => {
      prisma.updateAd = jest.fn();
      prisma.updateManyOffers = jest.fn();
      prisma.ad = jest.fn().mockReturnValue({
        creator: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      }); // user used in testUtils
    });

    test("When deleting Ad, Then only owner or Admin is allowed", async () => {
      const deleteAdInput = { id: "someAdId" };

      const userCtx = getUserContext(prisma);
      const adminCtx = getAdminContext(prisma);
      const badCtx = getContextWithId(prisma, "randomUserId");

      const expectedDeleteFlagData = { status: "DELETED" };

      // user
      await AdMutationResolver.deleteAd(
        undefined,
        deleteAdInput,
        userCtx,
        undefined
      );
      expect(prisma.updateAd).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someAdId" }
      });

      // admin
      await AdMutationResolver.deleteAd(
        undefined,
        deleteAdInput,
        adminCtx,
        undefined
      );

      expect(prisma.updateAd).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someAdId" }
      });

      // wrong user
      await expect(
        AdMutationResolver.deleteAd(undefined, deleteAdInput, badCtx, undefined)
      ).rejects.toThrowError(UserNotCreatorError);
    });

    test("When deleting Ad, Then delete all offers on the ad", async () => {
      const deleteAdInput = { id: "someAdId" };
      const userCtx = getUserContext(prisma);
      const expectedDeleteFlagData = { status: "DELETED" };

      await AdMutationResolver.deleteAd(
        undefined,
        deleteAdInput,
        userCtx,
        undefined
      );

      expect(prisma.updateManyOffers).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { ad: { id: "someAdId" } }
      });
    });

    test("When deleting an Ad. Then prisma should not actually delete the ad", async () => {
      prisma.deleteAd = jest.fn();
      const deleteAdInput = { id: "someAdId" };
      const userCtx = getUserContext(prisma);

      await AdMutationResolver.deleteAd(
        undefined,
        deleteAdInput,
        userCtx,
        undefined
      );

      expect(prisma.deleteAd).toBeCalledTimes(0);
    });
  });
});
