import Query from "./Queries";
import Mutation from "./Mutations";
import Subscription from "./Subscriptions";
import Nodes from "./Nodes";
import { MutationResolvers, Resolvers } from "../generated/yoga-client";

const resolvers: Resolvers = {
  Query,
  Subscription,
  Mutation,
  ...Nodes
};

export default resolvers;
