import Query from "./Queries";
import Mutation from "./Mutations";
import Subscription from "./Subscriptions";
import Nodes from "./Nodes";

const resolvers = {
  Query,
  Subscription,
  Mutation,
  ...Nodes
};

export default resolvers;
