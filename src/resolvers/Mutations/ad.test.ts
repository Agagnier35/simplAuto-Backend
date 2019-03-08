import * as Utils from "../../utils";
import { ad as AdMutationResolver } from "../Mutations/ad";
import { createPrismaMock, getUserContext } from "../../testUtils";

let mockedPrisma;

describe("Ads mutations tests suite", () => {
  beforeEach(() => {
    mockedPrisma = createPrismaMock();
  });

  test("When creating an Ad, Then fetch userID", async () => {
    mockedPrisma.createAd = jest.fn();
    const userSpy = jest.spyOn(Utils, "getUserId");

    const createAdInput = { data: {} };
    await AdMutationResolver.createAd(
      undefined,
      createAdInput,
      getUserContext(mockedPrisma),
      undefined
    );
    expect(userSpy).toHaveBeenCalledTimes(1);
  });

  test("When creating an Ad, Then pass the user id to Prisma", async () => {
    mockedPrisma.createAd = jest.fn(args => args);
    const ctx = getUserContext(mockedPrisma);

    const createAdInput = { data: {} };
    const res = await AdMutationResolver.createAd(
      undefined,
      createAdInput,
      ctx,
      undefined
    );
    expect(mockedPrisma.createAd).toBeCalledWith({
      creator: { connect: { id: ctx.request.userId } }
    });
  });
});
