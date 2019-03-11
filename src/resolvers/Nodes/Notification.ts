import { Context } from "../../utils";
import { NotificationResolvers } from "../../generated/yoga-client";

export const Notification: NotificationResolvers.Type = {
  ...NotificationResolvers.defaultResolvers,

  owner: ({ id }, args, ctx: Context) => {
    return ctx.prisma.notification({ id }).owner();
  }
};
