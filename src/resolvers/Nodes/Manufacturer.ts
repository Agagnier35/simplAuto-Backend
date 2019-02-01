import { Context } from "../../utils";

export const Manufacturer = {
  models: ({ id }, args, ctx: Context) => {
    return ctx.prisma.manufacturer({ id }).models();
  }
};
