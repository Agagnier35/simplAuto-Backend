import * as Utils from "../../utils";
import { ad as AdMutationResolver } from "../Mutations/ad";
import { getUserContext } from "../../testUtils";
import { createMockInstance } from "jest-create-mock-instance";
import { Prisma } from "../../generated/prisma-client";

let prisma: jest.Mocked<Prisma>;
describe("Ads mutations tests suite", () => {
  beforeEach(() => {
    prisma = createMockInstance(Prisma);
  });

  test("When creating an Ad, Then fetch userID", async () => {
    prisma.createAd = jest.fn();
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
    prisma.createAd = jest.fn();
    const ctx = getUserContext(prisma);

    const createAdInput = { data: {} };
    const res = await AdMutationResolver.createAd(
      undefined,
      createAdInput,
      ctx,
      undefined
    );
    expect(prisma.createAd).toBeCalledWith({
      creator: { connect: { id: ctx.request.userId } }
    });
  });
});
