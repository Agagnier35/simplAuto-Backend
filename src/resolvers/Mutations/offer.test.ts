import * as Utils from "../../utils";
import { offer as OfferMutationResolver } from "../Mutations/offer";
import { Prisma } from "../../generated/prisma-client";
import createMockInstance from "jest-create-mock-instance";
import {
  getUserContext,
  getAdminContext,
  getContextWithId
} from "../../testUtils";
import {
  CannotCreateOfferOnOwnAd,
  CannotCreateOfferWithNotOwnedCar
} from "../../errors/offerErrors";
import { UserNotCreatorError } from "../../errors/authErrors";

let prisma: jest.Mocked<Prisma>;
describe("Offers mutations tests suite", () => {
  beforeEach(() => {
    prisma = createMockInstance(Prisma);
  });

  describe("Create Offer test suite", () => {
    beforeEach(() => {
      prisma.createOffer = jest.fn().mockReturnValue({
        id: "someRandomOfferID"
      });
      prisma.ad = jest.fn();

      prisma.ad = jest.fn().mockReturnValue({
        creator: jest.fn(() => ({ id: "someRandomID" }))
      });
      prisma.car = jest.fn().mockReturnValue({
        owner: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      });
      prisma.createNotification = jest.fn();
    });

    const basicOfferCreateInput = {
      data: {
        adID: "adID",
        carID: "carID",
        price: 10000,
        addons: [{ id: "1", name: "allo" }, { name: "bye" }]
      }
    };

    test("When creating an offer, Then fetch userID", async () => {
      const userSpy = jest.spyOn(Utils, "getUserId");

      await OfferMutationResolver.createOffer(
        undefined,
        basicOfferCreateInput,
        getUserContext(prisma),
        undefined
      );
      expect(userSpy).toHaveBeenCalledTimes(1);
    });

    test("When creating offer, Then connect preset features and create others", async () => {
      await OfferMutationResolver.createOffer(
        undefined,
        basicOfferCreateInput,
        getUserContext(prisma),
        undefined
      );
      expect(prisma.createOffer).toBeCalledWith({
        creator: { connect: { id: "cjsxuztcx049d087164xib1bd" } },
        ad: { connect: { id: "adID" } },
        car: { connect: { id: "carID" } },
        price: 10000,
        addons: { connect: [{ id: "1" }], create: [{ name: "bye" }] }
      });
    });
    test("When creating offer with an ad you own, Then throw error", async () => {
      prisma.ad = jest.fn().mockReturnValue({
        creator: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      }); // user used in testUtils

      await expect(
        OfferMutationResolver.createOffer(
          undefined,
          basicOfferCreateInput,
          getUserContext(prisma),
          undefined
        )
      ).rejects.toThrowError(CannotCreateOfferOnOwnAd);
    });

    test("When creating offer with a car you do not own, Then throw error", async () => {
      prisma.car = jest.fn().mockReturnValue({
        owner: jest.fn(() => ({ id: "someRandomID" }))
      });

      await expect(
        OfferMutationResolver.createOffer(
          undefined,
          basicOfferCreateInput,
          getUserContext(prisma),
          undefined
        )
      ).rejects.toThrowError(CannotCreateOfferWithNotOwnedCar);
    });
  });

  describe("Update offer test suite", () => {
    beforeEach(() => {
      prisma.car = jest.fn().mockReturnValue({
        owner: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      });
      prisma.offer = jest.fn().mockReturnValue({
        addons: jest.fn(() => [])
      });
      prisma.deleteManyOfferAddons = jest.fn();
      prisma.updateOffer = jest.fn();
    });

    test("When updating Offer, Then only owner or Admin is allowed", async () => {
      const updateOfferInput = { data: { id: "someOfferID" } };
      const expectedUpdateOfferData = {};

      const userCtx = getUserContext(prisma);
      const adminCtx = getAdminContext(prisma);
      const badCtx = getContextWithId(prisma, "randomUserId");

      // user
      await OfferMutationResolver.updateOffer(
        undefined,
        updateOfferInput,
        userCtx,
        undefined
      );
      expect(prisma.updateOffer).toBeCalledWith({
        data: expectedUpdateOfferData,
        where: { id: "someOfferID" }
      });

      // admin
      await OfferMutationResolver.updateOffer(
        undefined,
        updateOfferInput,
        adminCtx,
        undefined
      );

      expect(prisma.updateOffer).toBeCalledWith({
        data: expectedUpdateOfferData,
        where: { id: "someOfferID" }
      });

      // wrong user
      await expect(
        OfferMutationResolver.updateOffer(
          undefined,
          updateOfferInput,
          badCtx,
          undefined
        )
      ).rejects.toThrowError(UserNotCreatorError);
    });

    test("When updating offer, then delete and reconnect all addons", async () => {
      prisma.offer = jest.fn().mockReturnValue({
        addons: jest.fn(() => [
          { id: "addon1", rankValue: 10 },
          { id: "addon2", rankValue: 0 }
        ])
      });

      const updateOfferInput = {
        data: {
          id: "someOfferID",
          addons: [{ id: "addon1" }, { id: "addon3" }, { name: "customAddon" }]
        }
      };

      await OfferMutationResolver.updateOffer(
        undefined,
        updateOfferInput,
        getUserContext(prisma),
        undefined
      );

      expect(prisma.updateOffer).toHaveBeenNthCalledWith(1, {
        data: {
          addons: {
            disconnect: [{ id: "addon1" }, { id: "addon2" }]
          }
        },
        where: { id: "someOfferID" }
      });
      expect(prisma.deleteManyOfferAddons).toBeCalledWith({
        rankValue_lte: 0,
        id_in: ["addon1", "addon2"]
      });
      expect(prisma.updateOffer).toHaveBeenNthCalledWith(2, {
        data: {
          addons: {
            connect: [{ id: "addon1" }, { id: "addon3" }],
            create: [{ name: "customAddon" }]
          }
        },
        where: { id: "someOfferID" }
      });
    });
  });

  describe("Delete offer test suite", () => {
    beforeEach(() => {
      prisma.car = jest.fn().mockReturnValue({
        owner: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      });
      prisma.updateOffer = jest.fn();
    });

    test("When deleting Offer, Then only owner or Admin is allowed", async () => {
      const deleteOfferInput = { id: "someOfferID" };
      const expectedDeleteFlagData = { status: "DELETED" };

      const userCtx = getUserContext(prisma);
      const adminCtx = getAdminContext(prisma);
      const badCtx = getContextWithId(prisma, "randomUserId");

      // user
      await OfferMutationResolver.deleteOffer(
        undefined,
        deleteOfferInput,
        userCtx,
        undefined
      );
      expect(prisma.updateOffer).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someOfferID" }
      });

      // admin
      await OfferMutationResolver.deleteOffer(
        undefined,
        deleteOfferInput,
        adminCtx,
        undefined
      );

      expect(prisma.updateOffer).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someOfferID" }
      });

      // wrong user
      await expect(
        OfferMutationResolver.deleteOffer(
          undefined,
          deleteOfferInput,
          badCtx,
          undefined
        )
      ).rejects.toThrowError(UserNotCreatorError);
    });

    test("When deleting an offer. Then prisma should not actually delete the offer", async () => {
      prisma.deleteOffer = jest.fn();
      const deleteOfferInput = { id: "someCarId" };

      await OfferMutationResolver.deleteOffer(
        undefined,
        deleteOfferInput,
        getUserContext(prisma),
        undefined
      );

      expect(prisma.deleteOffer).toBeCalledTimes(0);
    });
  });
});
