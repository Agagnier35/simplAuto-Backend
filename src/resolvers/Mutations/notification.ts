import { getUserId, Context, emailRegex } from "../../utils";
import { MutationResolvers as Types } from "../../generated/yoga-client";

interface NotificationResolvers {
  deleteNotification: Types.DeleteNotificationResolver;
}

export const notification: NotificationResolvers = {
  async deleteNotification(parent, { id }, ctx: Context, info) {
    const userID = getUserId(ctx);

    await ctx.prisma.deleteManyNotifications({
      owner: {
        id: userID
      },
      objectID: id
    });

    return null;
  }
};
