import { getUserId, Context } from "../../utils";
import {
  UserAlreadyPremiumError,
  MaxCarLimitNotPremiumError
} from "../../errors/userErrors";
import { MutationResolvers as Types } from "../../generated/yoga-client";

import stripe from "../../stripe";
import {
  StripeCreateSubscriptionError,
  StripeChargeCarSpotError,
  StripeCarSpotOrderError
} from "../../errors/stripeErrors";
import { MAX_CARS_NOT_PREMIUM } from "./car";

interface PaymentResolvers {
  goPremium: Types.GoPremiumResolver;
  buyCarSpot: Types.BuyCarSpotResolver;
}

export const payment: PaymentResolvers = {
  async goPremium(parent, { stripeToken }, ctx: Context, info) {
    const id = getUserId(ctx);

    const user = await ctx.prisma.user({ id });

    const permissions = await ctx.prisma.user({ id }).permissions();

    if (permissions.includes("PREMIUM")) {
      throw UserAlreadyPremiumError;
    }

    permissions.push("PREMIUM");

    try {
      // Set default payment method for Stripe Subscription
      await stripe.customers.update(user.stripeCustomerID, {
        source: stripeToken
      });

      await stripe.subscriptions.create({
        customer: user.stripeCustomerID,
        items: [
          {
            plan: process.env["STRIPE_SKU_PREMIUM_ACCOUNT"]
          }
        ]
      });
    } catch (error) {
      throw StripeCreateSubscriptionError;
    }

    return ctx.prisma.updateUser({
      where: { id },
      data: {
        permissions: {
          set: permissions
        }
      }
    });
  },
  async buyCarSpot(parent, { stripeToken, amount }, ctx: Context, info) {
    const id = getUserId(ctx);

    const user = await ctx.prisma.user({ id });

    if (user.carLimit + amount > MAX_CARS_NOT_PREMIUM) {
      throw MaxCarLimitNotPremiumError;
    }

    try {
      const order = await stripe.orders.create({
        currency: "cad",
        items: [
          {
            type: "sku",
            parent: process.env["STRIPE_SKU_CAR_SPOT"]
          }
        ],
        email: user.email
      });

      await stripe.orders.pay(order.id, {
        source: stripeToken
      });
    } catch (error) {
      throw StripeCarSpotOrderError;
    }

    return ctx.prisma.updateUser({
      where: { id },
      data: {
        carLimit: user.carLimit + amount
      }
    });
  }
};
