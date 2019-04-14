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

    const message = await ctx.prisma.createMessage({
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

    const buyer = await ctx.prisma.conversation({ id: conversationID }).buyer();
    const seller = await ctx.prisma
      .conversation({ id: conversationID })
      .seller();

    const senderIsBuyer = buyer.id === id;
    const offer = await ctx.prisma.conversation({ id: conversationID }).offer();
    const { status } = await ctx.prisma.conversation({ id: conversationID });

    const notificationArray = await ctx.prisma.notifications({
      where: {
        type: "OFFER_MESSAGE",
        owner: {
          id: senderIsBuyer ? seller.id : buyer.id
        },
        objectID: offer.id
      }
    });

    const notification = notificationArray[0];
    const wantNotfications = senderIsBuyer
      ? seller.notificationInAppMessage
      : buyer.notificationInAppMessage;

    if (status !== "DELETED" && wantNotfications) {
      if (notification) {
        await ctx.prisma.updateManyNotifications({
          data: {
            count: notification.count + 1
          },
          where: {
            type: "OFFER_MESSAGE",
            owner: {
              id: senderIsBuyer ? seller.id : buyer.id
            },
            objectID: offer.id
          }
        });
      } else {
        // create notification to the other member of the conversation
        await ctx.prisma.createNotification({
          owner: {
            connect: {
              id: senderIsBuyer ? seller.id : buyer.id
            }
          },
          type: "OFFER_MESSAGE",
          objectID: offer.id
        });
      }
    }

    return message;
  }
};
