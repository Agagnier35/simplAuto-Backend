import Stripe from "stripe";
import { User } from "./generated/prisma-client/index";
import { StripeCreateCustomerError } from "./errors/authErrors";
import { Context } from "./utils";

const stripe = new Stripe(process.env.STRIPE_KEY);
export default stripe;

export async function createCustomer(user: User, ctx: Context) {
  await stripe.customers.create(
    {
      description: `Customer for ${user.email}`,
      email: user.email
    },
    async (err, customer) => {
      if (err) {
        throw StripeCreateCustomerError;
      } else {
        await ctx.prisma.updateUser({
          where: { id: user.id },
          data: {
            stripeCustomerID: customer.id
          }
        });
      }
    }
  );
}

// Only works in dev...
export async function deleteSeededCustomers() {
  const emails = [
    "dominic@yopmail.com",
    "alexandre_clark@yopmail.com",
    "king@yopmail.com"
  ];
  await stripe.customers.list({ limit: 100 }, async (err, customers) => {
    customers.data.forEach(async (customer: Stripe.customers.ICustomer) => {
      if (emails.includes(customer.email)) {
        await stripe.customers.del(customer.id);
      }
    });
  });
}
