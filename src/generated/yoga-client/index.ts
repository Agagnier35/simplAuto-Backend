export type Maybe<T> = T | null;

export interface UserSignupInput {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  location: string;

  age: number;

  gender: Gender;
}

export interface UserUpdateInput {
  id: string;

  email?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  password?: Maybe<string>;

  location?: Maybe<string>;

  age?: Maybe<number>;

  gender?: Maybe<Gender>;

  permissions?: Maybe<Permission[]>;
}

export interface CarCreateInput {
  manufacturerID: string;

  modelID: string;

  categoryID: string;

  year: number;

  mileage: number;

  photos: string[];

  featuresIDs?: Maybe<string[]>;
}

export interface AdCreateInput {
  adFeatures?: Maybe<(Maybe<AdFeatureInput>)[]>;

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturerID?: Maybe<string>;

  modelID?: Maybe<string>;

  categoryID?: Maybe<string>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  isUrgent?: Maybe<boolean>;

  isFirst?: Maybe<boolean>;
}

export interface AdFeatureInput {
  featureID: string;

  importance: AdFeatureImportance;
}

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  Other = "OTHER"
}

export enum Permission {
  User = "USER",
  Premium = "PREMIUM",
  Admin = "ADMIN"
}

export enum AdFeatureImportance {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH"
}

export enum AdStatus {
  Published = "PUBLISHED",
  Accepted = "ACCEPTED",
  Deleted = "DELETED"
}

export enum OfferStatus {
  Published = "PUBLISHED",
  Accepted = "ACCEPTED",
  Deleted = "DELETED"
}

// ====================================================
// Types
// ====================================================

export interface Query {
  feed: Post[];

  drafts: Post[];

  post?: Maybe<Post>;

  me?: Maybe<User>;

  ads?: Maybe<Ad[]>;
}

export interface Post {
  id: string;

  published: boolean;

  title: string;

  content: string;

  author: User;
}

export interface User {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  location: string;

  age: number;

  gender: Gender;

  permissions: Permission[];

  offers: Offer[];

  ads: Ad[];

  cars: Car[];
}

export interface Offer {
  id: string;

  creator: User;

  ad: Ad;

  car: Car;

  price: number;

  status: OfferStatus;

  finalRank?: Maybe<number>;
}

export interface Ad {
  id: string;

  creator: User;

  offers?: Maybe<Offer[]>;

  features?: Maybe<AdFeature[]>;

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturer?: Maybe<Manufacturer>;

  model?: Maybe<CarModel>;

  category?: Maybe<CarCategory>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  isUrgent: boolean;

  isFirst: boolean;

  status: AdStatus;
}

export interface AdFeature {
  id: string;

  feature: CarFeature;

  importance: AdFeatureImportance;
}

export interface CarFeature {
  id: string;

  name: string;

  category: CarFeatureCategory;
}

export interface CarFeatureCategory {
  id: string;

  name: string;

  features: CarFeature[];
}

export interface Manufacturer {
  id: string;

  name: string;

  models: CarModel[];
}

export interface CarModel {
  id: string;

  name: string;
}

export interface CarCategory {
  id: string;

  name: string;
}

export interface Car {
  id: string;

  owner: User;

  manufacturer: Manufacturer;

  model: CarModel;

  category: CarCategory;

  year: number;

  mileage: number;

  photos: string[];

  features: CarFeature[];
}

export interface Mutation {
  signup: User;

  login: User;

  updateUser: User;

  createDraft: Post;

  createCar?: Maybe<Car>;

  createAd?: Maybe<Ad>;

  publish: Post;

  deletePost: Post;
}

export interface Subscription {
  feedSubscription?: Maybe<Post>;
}

// ====================================================
// Arguments
// ====================================================

export interface PostQueryArgs {
  id: string;
}
export interface AdsQueryArgs {
  adFeaturesIDs?: Maybe<(Maybe<string>)[]>;
}
export interface SignupMutationArgs {
  data: UserSignupInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface UpdateUserMutationArgs {
  data: UserUpdateInput;
}
export interface CreateDraftMutationArgs {
  title: string;

  content: string;
}
export interface CreateCarMutationArgs {
  data: CarCreateInput;
}
export interface CreateAdMutationArgs {
  data: AdCreateInput;
}
export interface PublishMutationArgs {
  id: string;
}
export interface DeletePostMutationArgs {
  id: string;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    feed?: FeedResolver<Post[], TypeParent, Context>;

    drafts?: DraftsResolver<Post[], TypeParent, Context>;

    post?: PostResolver<Maybe<Post>, TypeParent, Context>;

    me?: MeResolver<Maybe<User>, TypeParent, Context>;

    ads?: AdsResolver<Maybe<Ad[]>, TypeParent, Context>;
  }

  export type FeedResolver<R = Post[], Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DraftsResolver<R = Post[], Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PostResolver<
    R = Maybe<Post>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, PostArgs>;
  export interface PostArgs {
    id: string;
  }

  export type MeResolver<R = Maybe<User>, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AdsResolver<
    R = Maybe<Ad[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AdsArgs>;
  export interface AdsArgs {
    adFeaturesIDs?: Maybe<(Maybe<string>)[]>;
  }
}

export namespace PostResolvers {
  export interface Resolvers<Context = {}, TypeParent = Post> {
    id?: IdResolver<string, TypeParent, Context>;

    published?: PublishedResolver<boolean, TypeParent, Context>;

    title?: TitleResolver<string, TypeParent, Context>;

    content?: ContentResolver<string, TypeParent, Context>;

    author?: AuthorResolver<User, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Post, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PublishedResolver<
    R = boolean,
    Parent = Post,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TitleResolver<R = string, Parent = Post, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ContentResolver<
    R = string,
    Parent = Post,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<R = User, Parent = Post, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    password?: PasswordResolver<string, TypeParent, Context>;

    location?: LocationResolver<string, TypeParent, Context>;

    age?: AgeResolver<number, TypeParent, Context>;

    gender?: GenderResolver<Gender, TypeParent, Context>;

    permissions?: PermissionsResolver<Permission[], TypeParent, Context>;

    offers?: OffersResolver<Offer[], TypeParent, Context>;

    ads?: AdsResolver<Ad[], TypeParent, Context>;

    cars?: CarsResolver<Car[], TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmailResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstNameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PasswordResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LocationResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AgeResolver<R = number, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GenderResolver<
    R = Gender,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PermissionsResolver<
    R = Permission[],
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type OffersResolver<
    R = Offer[],
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AdsResolver<R = Ad[], Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CarsResolver<R = Car[], Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace OfferResolvers {
  export interface Resolvers<Context = {}, TypeParent = Offer> {
    id?: IdResolver<string, TypeParent, Context>;

    creator?: CreatorResolver<User, TypeParent, Context>;

    ad?: AdResolver<Ad, TypeParent, Context>;

    car?: CarResolver<Car, TypeParent, Context>;

    price?: PriceResolver<number, TypeParent, Context>;

    status?: StatusResolver<OfferStatus, TypeParent, Context>;

    finalRank?: FinalRankResolver<Maybe<number>, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Offer, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CreatorResolver<
    R = User,
    Parent = Offer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AdResolver<R = Ad, Parent = Offer, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CarResolver<R = Car, Parent = Offer, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PriceResolver<
    R = number,
    Parent = Offer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StatusResolver<
    R = OfferStatus,
    Parent = Offer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FinalRankResolver<
    R = Maybe<number>,
    Parent = Offer,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace AdResolvers {
  export interface Resolvers<Context = {}, TypeParent = Ad> {
    id?: IdResolver<string, TypeParent, Context>;

    creator?: CreatorResolver<User, TypeParent, Context>;

    offers?: OffersResolver<Maybe<Offer[]>, TypeParent, Context>;

    features?: FeaturesResolver<Maybe<AdFeature[]>, TypeParent, Context>;

    priceLowerBound?: PriceLowerBoundResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    priceHigherBound?: PriceHigherBoundResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    manufacturer?: ManufacturerResolver<
      Maybe<Manufacturer>,
      TypeParent,
      Context
    >;

    model?: ModelResolver<Maybe<CarModel>, TypeParent, Context>;

    category?: CategoryResolver<Maybe<CarCategory>, TypeParent, Context>;

    mileageLowerBound?: MileageLowerBoundResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    mileageHigherBound?: MileageHigherBoundResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    yearLowerBound?: YearLowerBoundResolver<Maybe<number>, TypeParent, Context>;

    yearHigherBound?: YearHigherBoundResolver<
      Maybe<number>,
      TypeParent,
      Context
    >;

    isUrgent?: IsUrgentResolver<boolean, TypeParent, Context>;

    isFirst?: IsFirstResolver<boolean, TypeParent, Context>;

    status?: StatusResolver<AdStatus, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Ad, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type CreatorResolver<R = User, Parent = Ad, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OffersResolver<
    R = Maybe<Offer[]>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FeaturesResolver<
    R = Maybe<AdFeature[]>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PriceLowerBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PriceHigherBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ManufacturerResolver<
    R = Maybe<Manufacturer>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ModelResolver<
    R = Maybe<CarModel>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CategoryResolver<
    R = Maybe<CarCategory>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MileageLowerBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MileageHigherBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type YearLowerBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type YearHigherBoundResolver<
    R = Maybe<number>,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsUrgentResolver<
    R = boolean,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsFirstResolver<
    R = boolean,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StatusResolver<
    R = AdStatus,
    Parent = Ad,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace AdFeatureResolvers {
  export interface Resolvers<Context = {}, TypeParent = AdFeature> {
    id?: IdResolver<string, TypeParent, Context>;

    feature?: FeatureResolver<CarFeature, TypeParent, Context>;

    importance?: ImportanceResolver<AdFeatureImportance, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = AdFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FeatureResolver<
    R = CarFeature,
    Parent = AdFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ImportanceResolver<
    R = AdFeatureImportance,
    Parent = AdFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CarFeatureResolvers {
  export interface Resolvers<Context = {}, TypeParent = CarFeature> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    category?: CategoryResolver<CarFeatureCategory, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CarFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = CarFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CategoryResolver<
    R = CarFeatureCategory,
    Parent = CarFeature,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CarFeatureCategoryResolvers {
  export interface Resolvers<Context = {}, TypeParent = CarFeatureCategory> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    features?: FeaturesResolver<CarFeature[], TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CarFeatureCategory,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = CarFeatureCategory,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FeaturesResolver<
    R = CarFeature[],
    Parent = CarFeatureCategory,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ManufacturerResolvers {
  export interface Resolvers<Context = {}, TypeParent = Manufacturer> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    models?: ModelsResolver<CarModel[], TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = Manufacturer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = Manufacturer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ModelsResolver<
    R = CarModel[],
    Parent = Manufacturer,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CarModelResolvers {
  export interface Resolvers<Context = {}, TypeParent = CarModel> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CarModel,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = CarModel,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CarCategoryResolvers {
  export interface Resolvers<Context = {}, TypeParent = CarCategory> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CarCategory,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = CarCategory,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace CarResolvers {
  export interface Resolvers<Context = {}, TypeParent = Car> {
    id?: IdResolver<string, TypeParent, Context>;

    owner?: OwnerResolver<User, TypeParent, Context>;

    manufacturer?: ManufacturerResolver<Manufacturer, TypeParent, Context>;

    model?: ModelResolver<CarModel, TypeParent, Context>;

    category?: CategoryResolver<CarCategory, TypeParent, Context>;

    year?: YearResolver<number, TypeParent, Context>;

    mileage?: MileageResolver<number, TypeParent, Context>;

    photos?: PhotosResolver<string[], TypeParent, Context>;

    features?: FeaturesResolver<CarFeature[], TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Car, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type OwnerResolver<R = User, Parent = Car, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ManufacturerResolver<
    R = Manufacturer,
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ModelResolver<
    R = CarModel,
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CategoryResolver<
    R = CarCategory,
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type YearResolver<R = number, Parent = Car, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MileageResolver<
    R = number,
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PhotosResolver<
    R = string[],
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type FeaturesResolver<
    R = CarFeature[],
    Parent = Car,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    signup?: SignupResolver<User, TypeParent, Context>;

    login?: LoginResolver<User, TypeParent, Context>;

    updateUser?: UpdateUserResolver<User, TypeParent, Context>;

    createDraft?: CreateDraftResolver<Post, TypeParent, Context>;

    createCar?: CreateCarResolver<Maybe<Car>, TypeParent, Context>;

    createAd?: CreateAdResolver<Maybe<Ad>, TypeParent, Context>;

    publish?: PublishResolver<Post, TypeParent, Context>;

    deletePost?: DeletePostResolver<Post, TypeParent, Context>;
  }

  export type SignupResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    SignupArgs
  >;
  export interface SignupArgs {
    data: UserSignupInput;
  }

  export type LoginResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    LoginArgs
  >;
  export interface LoginArgs {
    email: string;

    password: string;
  }

  export type UpdateUserResolver<
    R = User,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateUserArgs>;
  export interface UpdateUserArgs {
    data: UserUpdateInput;
  }

  export type CreateDraftResolver<
    R = Post,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateDraftArgs>;
  export interface CreateDraftArgs {
    title: string;

    content: string;
  }

  export type CreateCarResolver<
    R = Maybe<Car>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateCarArgs>;
  export interface CreateCarArgs {
    data: CarCreateInput;
  }

  export type CreateAdResolver<
    R = Maybe<Ad>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateAdArgs>;
  export interface CreateAdArgs {
    data: AdCreateInput;
  }

  export type PublishResolver<R = Post, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    PublishArgs
  >;
  export interface PublishArgs {
    id: string;
  }

  export type DeletePostResolver<
    R = Post,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeletePostArgs>;
  export interface DeletePostArgs {
    id: string;
  }
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    feedSubscription?: FeedSubscriptionResolver<
      Maybe<Post>,
      TypeParent,
      Context
    >;
  }

  export type FeedSubscriptionResolver<
    R = Maybe<Post>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  Post?: PostResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Offer?: OfferResolvers.Resolvers<Context>;
  Ad?: AdResolvers.Resolvers<Context>;
  AdFeature?: AdFeatureResolvers.Resolvers<Context>;
  CarFeature?: CarFeatureResolvers.Resolvers<Context>;
  CarFeatureCategory?: CarFeatureCategoryResolvers.Resolvers<Context>;
  Manufacturer?: ManufacturerResolvers.Resolvers<Context>;
  CarModel?: CarModelResolvers.Resolvers<Context>;
  CarCategory?: CarCategoryResolvers.Resolvers<Context>;
  Car?: CarResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  Subscription?: SubscriptionResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
