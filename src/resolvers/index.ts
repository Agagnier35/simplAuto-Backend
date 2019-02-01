import Query from "./Queries";
import Mutation from "./Mutations";
import Subscription from "./Subscriptions";
import Nodes from "./Nodes";

export default {
  Query,
  Mutation,
  Subscription,
  ...Nodes
};
