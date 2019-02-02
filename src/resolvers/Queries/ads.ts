import { Context } from "../../utils";

export const ads = {
  ads(parent, args, ctx: Context) {
    // TODO apply search criterias
    return ctx.prisma.ads();
  }
};
