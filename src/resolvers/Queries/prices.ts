import { Context, getUserId } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Prices } from "../../models";
import stripe from "../../stripe";
import { StripeGetPricesError } from "../../errors/stripeErrors";

interface PricesQueries {
  getPrices: QueryResolvers.GetPricesResolver;
}

export const prices: PricesQueries = {
  async getPrices(parent, args, ctx: Context) {
    // Only loggedIn users
    getUserId(ctx);

    const prices = {} as Prices;

    try {
      const carSpot = await stripe.skus.retrieve(
        process.env["STRIPE_SKU_CAR_SPOT"]
      );
      prices.carSpot = carSpot.price;

      const urgentAd = await stripe.skus.retrieve(
        process.env["STRIPE_SKU_URGENT_AD"]
      );
      prices.urgentAd = urgentAd.price;

      const topAd = await stripe.skus.retrieve(
        process.env["STRIPE_SKU_TOP_AD"]
      );
      prices.topAd = topAd.price;

      const premiumAccount = await stripe.plans.retrieve(
        process.env["STRIPE_SKU_PREMIUM_ACCOUNT"]
      );
      prices.premiumAccount = premiumAccount.amount;
    } catch (error) {
      throw StripeGetPricesError;
    }

    return prices;
  }
};
