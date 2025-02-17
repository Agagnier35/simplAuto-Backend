import { Context, getUserId } from "../../utils";
import { UserResolvers } from "../../generated/yoga-client";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  birthDate: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).birthDate();
  },

  location: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).location();
  },

  cars: ({ id }, { pageSize, pageNumber }, ctx: Context) => {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.user({ id }).cars(resolverArg);
  },
  carCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .carsConnection({
        where: {
          status: "PUBLISHED",
          owner: {
            id
          }
        }
      })
      .aggregate()
      .count();
  },
  ads: ({ id }, { pageSize, pageNumber }, ctx: Context) => {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.user({ id }).ads(resolverArg);
  },

  adCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .adsConnection({
        where: {
          status: "PUBLISHED",
          creator: {
            id
          }
        }
      })
      .aggregate()
      .count();
  },

  offers: ({ id }, { pageSize, pageNumber }, ctx: Context) => {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };
    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }
    return ctx.prisma.user({ id }).offers(resolverArg);
  },

  offerCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .offersConnection({
        where: {
          status: "PUBLISHED",
          creator: {
            id
          }
        }
      })
      .aggregate()
      .count();
  },

  conversations: ({ id }, args, ctx: Context) => {
    return ctx.prisma.conversations({
      where: {
        status: "OPENED",
        OR: [
          {
            buyer: {
              id
            }
          },
          {
            seller: {
              id
            }
          }
        ]
      }
    });
  },
  conversationCount({ id }, args, ctx: Context) {
    return ctx.prisma
      .conversationsConnection({
        where: {
          OR: [
            {
              buyer: {
                id
              }
            },
            {
              seller: {
                id
              }
            }
          ]
        }
      })
      .aggregate()
      .count();
  },
  notifications: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).notifications();
  },

  notificationCount(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    return ctx.prisma
      .notificationsConnection({
        where: {
          owner: {
            id
          }
        }
      })
      .aggregate()
      .count();
  }
};
