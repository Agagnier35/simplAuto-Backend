import { Context } from "../../utils";
import { UserResolvers } from "../../generated/yoga-client";

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  birthDate: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).birthDate();
  },

  cars: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).cars({
      where: {
        status: "PUBLISHED"
      }
    });
  },

  ads: ({ id }, { pageSize, pageNumber }, ctx: Context) => {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.user({ id }).ads(resolverArg);
  },

  conversations: ({ id }, args, ctx: Context) => {
    return ctx.prisma.user({ id }).conversations();
  }
};
