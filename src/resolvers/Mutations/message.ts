import {
  MutationResolvers as Types,
  OfferStatus
} from "../../generated/yoga-client";
import { Context, getUserId } from "../../utils";

interface MessageResolver {
  sendMessage: Types.SendMessageResolver;
}

export const message: MessageResolver = {
  async sendMessage(parent, { data }, ctx: Context) {
    const id = getUserId(ctx);

    const { text, image, conversationID } = data;

    return await ctx.prisma.createMessage({
      text,
      image,
      sender: {
        connect: {
          id
        }
      },
      conversation: {
        connect: {
          id: conversationID
        }
      }
    });
  }
};
