import { auth } from "./auth";
import { post } from "./post";
import { user } from "./user";
import { car } from "./car";
import { ad } from "./ad";
import { MutationResolvers } from "../../generated/yoga-client";

const Mutations: MutationResolvers.Type = {
  ...auth,
  ...post,
  ...user,
  ...car,
  ...ad
};

export default Mutations;
