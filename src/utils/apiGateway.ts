import axios from "axios";
import {
  Ad,
  User,
  Manufacturer,
  CarModel,
  Location,
  Car
} from "../generated/prisma-client";
import { GatewayError } from "../errors/gatewayErrors";
import { Context } from "../utils";

const baseURLAPI = "http://api.marketcheck.com/v1/search";

export const fetchAdStatsFromAPI = async (ad: Ad, user: User, ctx: Context) => {
  const location = await ctx.prisma.user({ id: user.id }).location();
  const params: any = createBaseAPIParameters(user.radius, location);
  const headers: any = createBaseAPIHeaders();

  const { id } = ad;
  const make: Manufacturer = await ctx.prisma.ad({ id }).manufacturer();
  const model: CarModel = await ctx.prisma.ad({ id }).model();
  const year: string = getYearRangeString(ad);

  if (make) {
    params.make = make.name;
  }
  if (model) {
    params.model = model.name;
  }
  if (year.length > 0) {
    params.year = year;
  }

  try {
    const response = await axios.get(baseURLAPI, { params, headers });
    const { price, dom } = response.data.stats;
    return {
      averagePriceAPI: price.mean ? price.mean : 0,
      averageTimeOnMarketAPI: dom.mean ? dom.mean : 0
    };
  } catch (error) {
    throw GatewayError;
  }
};

export const fetchOfferStatsFromAPI = async (
  car: Car,
  user: User,
  ctx: Context
) => {
  const location = await ctx.prisma.user({ id: user.id }).location();
  const params: any = createBaseAPIParameters(user.radius, location);
  const headers: any = createBaseAPIHeaders();

  const { id } = car;
  const make: Manufacturer = await ctx.prisma.car({ id }).manufacturer();
  const model: CarModel = await ctx.prisma.car({ id }).model();
  const year: string = car.year.toString();

  if (make) {
    params.make = make.name;
  }
  if (model) {
    params.model = model.name;
  }
  if (year.length > 0) {
    params.year = year;
  }

  try {
    const response = await axios.get(baseURLAPI, { params, headers });
    const { price, dom } = response.data.stats;
    return {
      averagePriceAPI: price.mean ? price.mean : 0,
      averageTimeOnMarketAPI: dom.mean ? dom.mean : 0
    };
  } catch (error) {
    throw GatewayError;
  }
};

export const fetchAllStatsFromAPI = async (
  manufacturer: Manufacturer,
  model: CarModel,
  year: number,
  location: Location,
  radius: number
) => {
  const params: any = createBaseAPIParameters(radius, location);
  const headers = createBaseAPIHeaders();
  if (manufacturer) {
    params.make = manufacturer.name;
  }
  if (model) {
    params.model = model.name;
  }
  if (year) {
    params.year = year;
  }

  try {
    const response = await axios.get(baseURLAPI, { params, headers });
    const { price, dom } = response.data.stats;
    return {
      averagePriceAPI: price.mean ? price.mean : 0,
      averageTimeOnMarketAPI: dom.mean ? dom.mean : 0,
      lowestPriceSoldAPI: price.min ? price.min : 0,
      highestPriceSoldAPI: price.max ? price.max : 0,
      lowestTimeOnMarketAPI: dom.min ? dom.min : 0,
      highestTimeOnMarketAPI: dom.max ? dom.max : 0
    };
  } catch (error) {
    throw GatewayError;
  }
};

const createBaseAPIParameters = (radius: number, location: Location) => {
  return {
    radius,
    api_key: process.env.MARKETCHECK_KEY,
    start: 0,
    rows: 0,
    latitude: location.latitude,
    longitude: location.longitude,
    stats: "price,dom"
  };
};

const createBaseAPIHeaders = () => {
  return { Host: "marketcheck-prod.apigee.net" };
};

const getYearRangeString = (ad: Ad) => {
  let yearString = "";

  if (ad.yearLowerBound || ad.yearHigherBound) {
    // API only supports 1980 and onwards
    const lowerBound = ad.yearLowerBound >= 1980 ? ad.yearLowerBound : 1980;
    const higherBound = ad.yearHigherBound
      ? ad.yearHigherBound
      : new Date().getFullYear;

    for (let i = lowerBound; i < higherBound; i += 1) {
      yearString += `${i},`;
    }
    yearString = yearString.slice(0, -1); // remove last ","
  }
  return yearString;
};
