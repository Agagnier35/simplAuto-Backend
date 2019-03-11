import * as Utils from "../../utils";
import { car as CarMutationResolver } from "../Mutations/car";
import { Prisma } from "../../generated/prisma-client";
import createMockInstance from "jest-create-mock-instance";
import {
  getUserContext,
  getPremiumContext,
  getAdminContext,
  getContextWithId
} from "../../testUtils";
import { carLimitReachedError } from "../../errors/carErrors";
import { connect } from "http2";
import { UserNotCreatorError } from "../../errors/authErrors";

let prisma: jest.Mocked<Prisma>;
describe("Cars mutations tests suite", () => {
  beforeEach(() => {
    prisma = createMockInstance(Prisma);
  });

  describe("Create Car test suite", () => {
    beforeEach(() => {
      prisma.createCar = jest.fn();
    });

    const basicCarCreateInputMock = {
      data: {
        manufacturerID: "makeID",
        modelID: "modelID",
        categoryID: "categoryID",
        year: 1900,
        mileage: 10000,
        photos: ["www.google.ca"],
        featuresIDs: ["feature1", "feature2"]
      }
    };

    test("When creating a car, Then fetch userID and its permissions", async () => {
      prisma.cars = jest.fn().mockReturnValue(() => []);
      const userSpy = jest.spyOn(Utils, "getUserId");
      const permissionSpy = jest.spyOn(Utils, "getUserPermissions");

      await CarMutationResolver.createCar(
        undefined,
        basicCarCreateInputMock,
        getUserContext(prisma),
        undefined
      );
      expect(userSpy).toHaveBeenCalledTimes(1);
      expect(permissionSpy).toHaveBeenCalledTimes(1);
    });

    test("With a normal account with 2 cars, When creating a car, Then throw error", async () => {
      prisma.cars = jest.fn().mockReturnValue([{ id: "car1" }, { id: "car2" }]);

      await expect(
        CarMutationResolver.createCar(
          undefined,
          basicCarCreateInputMock,
          getUserContext(prisma),
          undefined
        )
      ).rejects.toThrowError(carLimitReachedError);
    });

    test("With a premium account with 2 cars, When creating a car, Then add the car", async () => {
      prisma.cars = jest.fn().mockReturnValue([{ id: "car1" }, { id: "car2" }]);

      await CarMutationResolver.createCar(
        undefined,
        basicCarCreateInputMock,
        getPremiumContext(prisma),
        undefined
      );

      expect(prisma.createCar).toBeCalledTimes(1);
    });

    test("When creating a car, Then send correct arguments to prisma", async () => {
      prisma.cars = jest.fn().mockReturnValue(() => []);

      await CarMutationResolver.createCar(
        undefined,
        basicCarCreateInputMock,
        getUserContext(prisma),
        undefined
      );

      expect(prisma.createCar).toHaveBeenCalledWith({
        owner: { connect: { id: "cjsxuztcx049d087164xib1bd" } },
        manufacturer: { connect: { id: "makeID" } },
        model: { connect: { id: "modelID" } },
        category: { connect: { id: "categoryID" } },
        year: 1900,
        mileage: 10000,
        photos: { set: ["www.google.ca"] },
        features: { connect: [{ id: "feature1" }, { id: "feature2" }] }
      });
    });
  });

  describe("Delete Car test suite", () => {
    beforeEach(() => {
      prisma.updateCar = jest.fn();
      prisma.updateManyOffers = jest.fn();
      prisma.car = jest.fn().mockReturnValue({
        owner: jest.fn(() => ({ id: "cjsxuztcx049d087164xib1bd" }))
      });
    });

    test("When deleting Car, Then only owner or Admin is allowed", async () => {
      const deleteCarInput = { id: "someCarId" };

      const userCtx = getUserContext(prisma);
      const adminCtx = getAdminContext(prisma);
      const badCtx = getContextWithId(prisma, "randomUserId");

      const expectedDeleteFlagData = { status: "DELETED" };

      // user
      await CarMutationResolver.deleteCar(
        undefined,
        deleteCarInput,
        userCtx,
        undefined
      );
      expect(prisma.updateCar).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someCarId" }
      });

      // admin
      await CarMutationResolver.deleteCar(
        undefined,
        deleteCarInput,
        adminCtx,
        undefined
      );

      expect(prisma.updateCar).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { id: "someCarId" }
      });

      // wrong user
      await expect(
        CarMutationResolver.deleteCar(
          undefined,
          deleteCarInput,
          badCtx,
          undefined
        )
      ).rejects.toThrowError(UserNotCreatorError);
    });

    test("When deleting Car, Then delete all offers on the ad", async () => {
      const deleteCarInput = { id: "someCarId" };
      const userCtx = getUserContext(prisma);
      const expectedDeleteFlagData = { status: "DELETED" };

      await CarMutationResolver.deleteCar(
        undefined,
        deleteCarInput,
        userCtx,
        undefined
      );

      expect(prisma.updateManyOffers).toBeCalledWith({
        data: expectedDeleteFlagData,
        where: { car: { id: "someCarId" } }
      });
    });

    test("When deleting a car. Then prisma should on update the Ad", async () => {
      prisma.deleteCar = jest.fn();
      const deleteAdInput = { id: "someCarId" };
      const userCtx = getUserContext(prisma);

      await CarMutationResolver.deleteCar(
        undefined,
        deleteAdInput,
        userCtx,
        undefined
      );

      expect(prisma.deleteCar).toBeCalledTimes(0);
    });
  });
});
