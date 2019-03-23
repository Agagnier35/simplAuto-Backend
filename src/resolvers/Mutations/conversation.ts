import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { Context, getUserId } from "../../utils";

interface ConversationResolver {
  createConversation: Types.CreateConversationResolver;
  updateConversation: Types.UpdateConversationResolver;
}

export const conversation: ConversationResolver = {
  async createConversation(parent, { offerID }, ctx: Context) {
    const selfID = getUserId(ctx);

    const seller = await ctx.prisma.offer({ id: offerID }).creator();

    return await ctx.prisma.createConversation({
      buyer: {
        connect: {
          id: selfID
        }
      },
      seller: {
        connect: {
          id: seller.id
        }
      },
      offer: {
        connect: {
          id: offerID
        }
      }
    });
  },
  async updateConversation(parent, { offerID }, ctx: Context) {
    return await ctx.prisma.updateConversation({
      offer: {
        connect: {
          id: offerID
        }
      }
    });
  }
};
