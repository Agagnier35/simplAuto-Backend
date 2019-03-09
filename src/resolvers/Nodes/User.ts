import { Context, getUserId } from "../../utils";
import { UserResolvers } from "../../generated/yoga-client";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  birthDate: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).birthDate();
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
  carCount(parent, args, ctx: Context) {
    const id = getUserId(ctx);
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

  adCount(parent, args, ctx: Context) {
    const id = getUserId(ctx);
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

  conversations: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).conversations();
  },
  conversationCount(parent, args, ctx: Context) {
    const id = getUserId(ctx);
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
  }
};
