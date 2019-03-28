import { QueryResolvers } from "../../generated/yoga-client";
import { Context, getUserId } from "../../utils";
import { AdminStatistics } from "../../models";

interface AdminStatsQueries {
  adminStats: QueryResolvers.AdminStatsResolver;
  adminStatisticsCar: QueryResolvers.AdminStatisticsCarResolver;
}

export const adminStatistics: AdminStatsQueries = {
  async adminStats(parent, args, ctx: Context) {
    const id = getUserId(ctx);
    const user = await ctx.prisma.user({ id });
    return {
      top10MostSoldMakeModel: [],
      top10FastestSold: [],
      bestSeller: user,
      bestSellerTop10Cars: [],
      allVehiculesCount: 0,
      allAdsCount: 0,
      activeUsersCount: 0,
      inactiveUsersCount: 0
    };
  },
  adminStatisticsCar(parent, args, ctx: Context) {
    return {
      averagePriceAPI: 0,
      averageTimeOnMarketAPI: 0,
      lowestPriceSoldAPI: 0,
      highestPriceSoldAPI: 0,
      lowestTimeOnMarketAPI: 0,
      highestTimeOnMarketAPI: 0,
      averagePriceApp: 0,
      averageTimeOnMarketApp: 0,
      lowestPriceSoldApp: 0,
      highestPriceSoldApp: 0,
      lowestTimeOnMarketApp: 0,
      highestTimeOnMarketApp: 0
    };
  }
};
