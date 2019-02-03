import { Context } from "../../utils";
import { ManufacturerResolvers } from "../../generated/yoga-client";

export const Manufacturer: ManufacturerResolvers.Type = {
  ...ManufacturerResolvers.defaultResolvers,

  models: ({ id }, args, ctx: Context) => {
    return ctx.prisma.manufacturer({ id }).models();
  }
};
