import axios from "axios";
import {
  Ad,
  User,
  Manufacturer,
  CarModel,
  Location
} from "../generated/prisma-client";
import { GatewayError } from "../errors/gatewayErrors";
import { Context } from "../utils";

const baseURLAPI = "http://api.marketcheck.com/v1/search";
const ALL_ROWS = 999999; // the API doesnt offer all rows ...

export const fetchStatsFromAPI = async (ad: Ad, user: User, ctx: Context) => {
  const location = await ctx.prisma.user({ id: user.id }).location();
  const params: any = createBaseAPIParameters(user.radius, location);

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

  axios
    .get(baseURLAPI, { params })
    .then(response => {
      console.log(response);
    })
    .catch(() => {
      throw GatewayError;
    });
};

const createBaseAPIParameters = async (radius: number, location: Location) => {
  return {
    radius,
    api_key: "",
    start: 0,
    rows: ALL_ROWS,
    latitude: location.latitude,
    longitude: location.longitude
  };
};

const getYearRangeString = (ad: Ad) => {
  let yearString = "";

  if (ad.yearLowerBound || ad.yearHigherBound) {
    // API only supports 1980 and onwards
    const lowerBound = ad.yearLowerBound <= 1980 ? ad.yearLowerBound : 1980;
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
