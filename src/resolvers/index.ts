import Query from "./Queries";
import Mutation from "./Mutations";
import Subscription from "./Subscriptions";
import { Ad } from "./Nodes/Ad";
import { User } from "./Nodes/User";
import { Offer } from "./Nodes/Offer";
import { Manufacturer } from "./Nodes/Manufacturer";
import { Car } from "./Nodes/Car";
import { CarFeature } from "./Nodes/CarFeature";
import { CarFeatureCategory } from "./Nodes/CarFeatureCategory";
import { Resolvers } from "../generated/yoga-client";
import { CarCategory } from "./Nodes/CarCategory";
import { CarModel } from "./Nodes/CarModel";
import { Date } from "./Nodes/Date";
import { Message } from "./Nodes/Message";
import { Conversation } from "./Nodes/Conversation";
import { OfferAddon } from "./Nodes/OfferAddon";
import { Notification } from "./Nodes/Notification";
import { OfferPosition } from "./Nodes/OfferPosition";
import { AdPosition } from "./Nodes/AdPosition";
import { Statistics } from "./Nodes/Statistics";
import { Location } from "./Nodes/Location";
import { Prices } from "./Nodes/Prices";

const resolvers: Resolvers = {
  Query,
  Subscription,
  Mutation,
  Ad,
  User,
  Offer,
  Manufacturer,
  Car,
  CarCategory,
  CarFeature,
  CarFeatureCategory,
  CarModel,
  Date,
  Message,
  Conversation,
  OfferAddon,
  OfferPosition,
  Notification,
  AdPosition,
  Statistics,
  Location
  Prices
};

export default resolvers;
