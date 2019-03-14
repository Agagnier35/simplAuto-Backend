import { Context } from "../../utils";
import { QueryResolvers } from "../../generated/yoga-client";
import { Offer, Car, Ad } from "../../generated/prisma-client";
import { AdPosition } from "../../models";
import { calc_score_adSuggestion } from "../../utils/calc_score";
import { CarModel } from "../Nodes/CarModel";

interface AdsQueries {
  ads: QueryResolvers.AdsResolver;
  ad: QueryResolvers.AdResolver;
  allAdsCount: QueryResolvers.AllAdsCountResolver;
  adSuggestion: QueryResolvers.AdSuggestionResolver;
}

export const ads: AdsQueries = {
  ads(parent, { pageNumber, pageSize }, ctx: Context) {
    const resolverArg: any = {
      where: {
        status: "PUBLISHED"
      }
    };

    if (pageSize && pageNumber >= 0) {
      resolverArg.skip = pageNumber * pageSize;
      resolverArg.first = pageSize;
    }

    return ctx.prisma.ads(resolverArg);
  },
  ad(parent, { id }, ctx: Context) {
    return ctx.prisma.ad({ id });
  },
  allAdsCount(parent, args, ctx: Context) {
    return ctx.prisma
      .adsConnection()
      .aggregate()
      .count();
  },

  async adSuggestion(parent, { id, pageNumber, pageSize }, ctx: Context) {
    const ads = await ctx.prisma.ads();
    const car = await ctx.prisma.car({ id });
    let ads_score = [];

    const carManufacturer = await ctx.prisma.car({ id }).manufacturer();
    const carModel = await ctx.prisma.car({ id }).model();
    const carCategory = await ctx.prisma.car({ id }).category();

    for (let i = 0; i < ads.length; i++) {
      const adCarManufacturer = await ctx.prisma
        .ad({ id: ads[i].id })
        .manufacturer();

      const adCarModel = await ctx.prisma.ad({ id: ads[i].id }).model();

      const adCarCategory = await ctx.prisma.ad({ id: ads[i].id }).category();

      let sameManufacturer = null;
      let sameModel = null;
      let sameCategory = null;
      adCarManufacturer && carManufacturer
        ? carManufacturer.id === adCarManufacturer.id
          ? (sameManufacturer = true)
          : (sameManufacturer = false)
        : null;

      adCarModel && carModel
        ? carModel.id === adCarModel.id
          ? (sameModel = true)
          : (sameModel = false)
        : null;

      adCarCategory && carCategory
        ? carCategory.id === adCarCategory.id
          ? (sameCategory = true)
          : (sameCategory = false)
        : null;

      console.log(car);
      const score = calc_score_adSuggestion(
        ads[i],
        car,
        sameManufacturer,
        sameModel,
        sameCategory
      );

      const ad_score: AdPosition = {
        ad: ads[i],
        score: score,
        position: null
      };
      ads_score.push(ad_score);
    }

    ads_score.sort((a, b) => (a.score > b.score ? -1 : 1));
    for (let i = 0; i < ads_score.length; i++) {
      ads_score[i].position = i;
    }

    if (pageSize && pageNumber >= 0) {
      if (pageNumber === 0) {
        ads_score = ads_score.slice(0, pageSize);
      } else {
        ads_score = ads_score.slice(
          pageNumber * pageSize - 1,
          pageSize * pageNumber + pageSize
        );
      }
    }

    return ads_score;
  }
};
