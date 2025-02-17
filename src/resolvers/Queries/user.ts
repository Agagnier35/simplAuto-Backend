import { Context, getUserId } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { NotAnAdminError } from "../../errors/authErrors";

interface UsersQueries {
  users: QueryResolvers.UsersResolver;
  user: QueryResolvers.UserResolver;
}

export const users: UsersQueries = {
  async users(parent, { pageNumber, pageSize, where }, ctx: Context) {
    const id = getUserId(ctx);

    const permissions = await ctx.prisma.user({ id }).permissions();

    if (!permissions.includes("ADMIN")) {
      throw NotAnAdminError;
    }

    const resolverArg: any = {
      where
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    const users = await ctx.prisma.users(resolverArg);

    const count = await ctx.prisma
      .usersConnection()
      .aggregate()
      .count();

    return {
      users,
      count
    };
  },
  async user(parent, { id }, ctx: Context) {
    const userID = getUserId(ctx);

    const permissions = await ctx.prisma.user({ id: userID }).permissions();

    if (permissions.includes("ADMIN") || id === userID) {
      return await ctx.prisma.user({ id });
    }

    throw NotAnAdminError;
  }
};
