import { auth } from "./auth";
import { user } from "./user";
import { car } from "./car";
import { ad } from "./ad";
import { offer } from "./offer";
import { conversation } from "./conversation";
import { MutationResolvers } from "../../generated/yoga-client";
import { message } from "./message";

const Mutations: MutationResolvers.Type = {
  ...auth,
  ...user,
  ...car,
  ...ad,
  ...offer,
  ...conversation,
  ...message
};

export default Mutations;
