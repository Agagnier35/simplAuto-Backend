export const typeDefs = /* GraphQL */ `type Ad {
  id: ID!
  creator: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: Manufacturer
  model: CarModel
  category: CarCategory
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeature!]
  isUrgent: Boolean!
  isFirst: Boolean!
  status: AdStatus!
}

type AdConnection {
  pageInfo: PageInfo!
  edges: [AdEdge]!
  aggregate: AggregateAd!
}

input AdCreateInput {
  creator: UserCreateOneWithoutAdsInput!
  offers: OfferCreateManyWithoutAdInput
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerCreateOneInput
  model: CarModelCreateOneInput
  category: CarCategoryCreateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureCreateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdCreateManyWithoutCreatorInput {
  create: [AdCreateWithoutCreatorInput!]
  connect: [AdWhereUniqueInput!]
}

input AdCreateOneWithoutOffersInput {
  create: AdCreateWithoutOffersInput
  connect: AdWhereUniqueInput
}

input AdCreateWithoutCreatorInput {
  offers: OfferCreateManyWithoutAdInput
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerCreateOneInput
  model: CarModelCreateOneInput
  category: CarCategoryCreateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureCreateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdCreateWithoutOffersInput {
  creator: UserCreateOneWithoutAdsInput!
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerCreateOneInput
  model: CarModelCreateOneInput
  category: CarCategoryCreateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureCreateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

type AdEdge {
  node: Ad!
  cursor: String!
}

enum AdOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  priceLowerBound_ASC
  priceLowerBound_DESC
  priceHigherBound_ASC
  priceHigherBound_DESC
  mileageLowerBound_ASC
  mileageLowerBound_DESC
  mileageHigherBound_ASC
  mileageHigherBound_DESC
  yearLowerBound_ASC
  yearLowerBound_DESC
  yearHigherBound_ASC
  yearHigherBound_DESC
  isUrgent_ASC
  isUrgent_DESC
  isFirst_ASC
  isFirst_DESC
  status_ASC
  status_DESC
}

type AdPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  priceLowerBound: Float
  priceHigherBound: Float
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  isUrgent: Boolean!
  isFirst: Boolean!
  status: AdStatus!
}

input AdScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  priceLowerBound: Float
  priceLowerBound_not: Float
  priceLowerBound_in: [Float!]
  priceLowerBound_not_in: [Float!]
  priceLowerBound_lt: Float
  priceLowerBound_lte: Float
  priceLowerBound_gt: Float
  priceLowerBound_gte: Float
  priceHigherBound: Float
  priceHigherBound_not: Float
  priceHigherBound_in: [Float!]
  priceHigherBound_not_in: [Float!]
  priceHigherBound_lt: Float
  priceHigherBound_lte: Float
  priceHigherBound_gt: Float
  priceHigherBound_gte: Float
  mileageLowerBound: Int
  mileageLowerBound_not: Int
  mileageLowerBound_in: [Int!]
  mileageLowerBound_not_in: [Int!]
  mileageLowerBound_lt: Int
  mileageLowerBound_lte: Int
  mileageLowerBound_gt: Int
  mileageLowerBound_gte: Int
  mileageHigherBound: Int
  mileageHigherBound_not: Int
  mileageHigherBound_in: [Int!]
  mileageHigherBound_not_in: [Int!]
  mileageHigherBound_lt: Int
  mileageHigherBound_lte: Int
  mileageHigherBound_gt: Int
  mileageHigherBound_gte: Int
  yearLowerBound: Int
  yearLowerBound_not: Int
  yearLowerBound_in: [Int!]
  yearLowerBound_not_in: [Int!]
  yearLowerBound_lt: Int
  yearLowerBound_lte: Int
  yearLowerBound_gt: Int
  yearLowerBound_gte: Int
  yearHigherBound: Int
  yearHigherBound_not: Int
  yearHigherBound_in: [Int!]
  yearHigherBound_not_in: [Int!]
  yearHigherBound_lt: Int
  yearHigherBound_lte: Int
  yearHigherBound_gt: Int
  yearHigherBound_gte: Int
  isUrgent: Boolean
  isUrgent_not: Boolean
  isFirst: Boolean
  isFirst_not: Boolean
  status: AdStatus
  status_not: AdStatus
  status_in: [AdStatus!]
  status_not_in: [AdStatus!]
  AND: [AdScalarWhereInput!]
  OR: [AdScalarWhereInput!]
  NOT: [AdScalarWhereInput!]
}

enum AdStatus {
  PUBLISHED
  ACCEPTED
  DELETED
}

type AdSubscriptionPayload {
  mutation: MutationType!
  node: Ad
  updatedFields: [String!]
  previousValues: AdPreviousValues
}

input AdSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AdWhereInput
  AND: [AdSubscriptionWhereInput!]
  OR: [AdSubscriptionWhereInput!]
  NOT: [AdSubscriptionWhereInput!]
}

input AdUpdateInput {
  creator: UserUpdateOneRequiredWithoutAdsInput
  offers: OfferUpdateManyWithoutAdInput
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerUpdateOneInput
  model: CarModelUpdateOneInput
  category: CarCategoryUpdateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureUpdateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyDataInput {
  priceLowerBound: Float
  priceHigherBound: Float
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyMutationInput {
  priceLowerBound: Float
  priceHigherBound: Float
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyWithoutCreatorInput {
  create: [AdCreateWithoutCreatorInput!]
  delete: [AdWhereUniqueInput!]
  connect: [AdWhereUniqueInput!]
  disconnect: [AdWhereUniqueInput!]
  update: [AdUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [AdUpsertWithWhereUniqueWithoutCreatorInput!]
  deleteMany: [AdScalarWhereInput!]
  updateMany: [AdUpdateManyWithWhereNestedInput!]
}

input AdUpdateManyWithWhereNestedInput {
  where: AdScalarWhereInput!
  data: AdUpdateManyDataInput!
}

input AdUpdateOneRequiredWithoutOffersInput {
  create: AdCreateWithoutOffersInput
  update: AdUpdateWithoutOffersDataInput
  upsert: AdUpsertWithoutOffersInput
  connect: AdWhereUniqueInput
}

input AdUpdateWithoutCreatorDataInput {
  offers: OfferUpdateManyWithoutAdInput
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerUpdateOneInput
  model: CarModelUpdateOneInput
  category: CarCategoryUpdateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureUpdateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateWithoutOffersDataInput {
  creator: UserUpdateOneRequiredWithoutAdsInput
  priceLowerBound: Float
  priceHigherBound: Float
  manufacturer: ManufacturerUpdateOneInput
  model: CarModelUpdateOneInput
  category: CarCategoryUpdateOneInput
  mileageLowerBound: Int
  mileageHigherBound: Int
  yearLowerBound: Int
  yearHigherBound: Int
  features: CarFeatureUpdateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateWithWhereUniqueWithoutCreatorInput {
  where: AdWhereUniqueInput!
  data: AdUpdateWithoutCreatorDataInput!
}

input AdUpsertWithoutOffersInput {
  update: AdUpdateWithoutOffersDataInput!
  create: AdCreateWithoutOffersInput!
}

input AdUpsertWithWhereUniqueWithoutCreatorInput {
  where: AdWhereUniqueInput!
  update: AdUpdateWithoutCreatorDataInput!
  create: AdCreateWithoutCreatorInput!
}

input AdWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  creator: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  offers_every: OfferWhereInput
  offers_some: OfferWhereInput
  offers_none: OfferWhereInput
  priceLowerBound: Float
  priceLowerBound_not: Float
  priceLowerBound_in: [Float!]
  priceLowerBound_not_in: [Float!]
  priceLowerBound_lt: Float
  priceLowerBound_lte: Float
  priceLowerBound_gt: Float
  priceLowerBound_gte: Float
  priceHigherBound: Float
  priceHigherBound_not: Float
  priceHigherBound_in: [Float!]
  priceHigherBound_not_in: [Float!]
  priceHigherBound_lt: Float
  priceHigherBound_lte: Float
  priceHigherBound_gt: Float
  priceHigherBound_gte: Float
  manufacturer: ManufacturerWhereInput
  model: CarModelWhereInput
  category: CarCategoryWhereInput
  mileageLowerBound: Int
  mileageLowerBound_not: Int
  mileageLowerBound_in: [Int!]
  mileageLowerBound_not_in: [Int!]
  mileageLowerBound_lt: Int
  mileageLowerBound_lte: Int
  mileageLowerBound_gt: Int
  mileageLowerBound_gte: Int
  mileageHigherBound: Int
  mileageHigherBound_not: Int
  mileageHigherBound_in: [Int!]
  mileageHigherBound_not_in: [Int!]
  mileageHigherBound_lt: Int
  mileageHigherBound_lte: Int
  mileageHigherBound_gt: Int
  mileageHigherBound_gte: Int
  yearLowerBound: Int
  yearLowerBound_not: Int
  yearLowerBound_in: [Int!]
  yearLowerBound_not_in: [Int!]
  yearLowerBound_lt: Int
  yearLowerBound_lte: Int
  yearLowerBound_gt: Int
  yearLowerBound_gte: Int
  yearHigherBound: Int
  yearHigherBound_not: Int
  yearHigherBound_in: [Int!]
  yearHigherBound_not_in: [Int!]
  yearHigherBound_lt: Int
  yearHigherBound_lte: Int
  yearHigherBound_gt: Int
  yearHigherBound_gte: Int
  features_every: CarFeatureWhereInput
  features_some: CarFeatureWhereInput
  features_none: CarFeatureWhereInput
  isUrgent: Boolean
  isUrgent_not: Boolean
  isFirst: Boolean
  isFirst_not: Boolean
  status: AdStatus
  status_not: AdStatus
  status_in: [AdStatus!]
  status_not_in: [AdStatus!]
  AND: [AdWhereInput!]
  OR: [AdWhereInput!]
  NOT: [AdWhereInput!]
}

input AdWhereUniqueInput {
  id: ID
}

type AggregateAd {
  count: Int!
}

type AggregateCar {
  count: Int!
}

type AggregateCarCategory {
  count: Int!
}

type AggregateCarFeature {
  count: Int!
}

type AggregateCarFeatureCategory {
  count: Int!
}

type AggregateCarModel {
  count: Int!
}

type AggregateConversation {
  count: Int!
}

type AggregateDate {
  count: Int!
}

type AggregateManufacturer {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregateOffer {
  count: Int!
}

type AggregateOfferAddon {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Car {
  id: ID!
  owner: User!
  manufacturer: Manufacturer!
  model: CarModel!
  category: CarCategory!
  year: Int!
  mileage: Int!
  photos: [String!]!
  features(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeature!]
  status: CarStatus!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
}

type CarCategory {
  id: ID!
  name: String!
}

type CarCategoryConnection {
  pageInfo: PageInfo!
  edges: [CarCategoryEdge]!
  aggregate: AggregateCarCategory!
}

input CarCategoryCreateInput {
  name: String!
}

input CarCategoryCreateOneInput {
  create: CarCategoryCreateInput
  connect: CarCategoryWhereUniqueInput
}

type CarCategoryEdge {
  node: CarCategory!
  cursor: String!
}

enum CarCategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarCategoryPreviousValues {
  id: ID!
  name: String!
}

type CarCategorySubscriptionPayload {
  mutation: MutationType!
  node: CarCategory
  updatedFields: [String!]
  previousValues: CarCategoryPreviousValues
}

input CarCategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarCategoryWhereInput
  AND: [CarCategorySubscriptionWhereInput!]
  OR: [CarCategorySubscriptionWhereInput!]
  NOT: [CarCategorySubscriptionWhereInput!]
}

input CarCategoryUpdateDataInput {
  name: String
}

input CarCategoryUpdateInput {
  name: String
}

input CarCategoryUpdateManyMutationInput {
  name: String
}

input CarCategoryUpdateOneInput {
  create: CarCategoryCreateInput
  update: CarCategoryUpdateDataInput
  upsert: CarCategoryUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CarCategoryWhereUniqueInput
}

input CarCategoryUpdateOneRequiredInput {
  create: CarCategoryCreateInput
  update: CarCategoryUpdateDataInput
  upsert: CarCategoryUpsertNestedInput
  connect: CarCategoryWhereUniqueInput
}

input CarCategoryUpsertNestedInput {
  update: CarCategoryUpdateDataInput!
  create: CarCategoryCreateInput!
}

input CarCategoryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CarCategoryWhereInput!]
  OR: [CarCategoryWhereInput!]
  NOT: [CarCategoryWhereInput!]
}

input CarCategoryWhereUniqueInput {
  id: ID
}

type CarConnection {
  pageInfo: PageInfo!
  edges: [CarEdge]!
  aggregate: AggregateCar!
}

input CarCreateInput {
  owner: UserCreateOneWithoutCarsInput!
  manufacturer: ManufacturerCreateOneInput!
  model: CarModelCreateOneInput!
  category: CarCategoryCreateOneInput!
  year: Int!
  mileage: Int!
  photos: CarCreatephotosInput
  features: CarFeatureCreateManyInput
  status: CarStatus
  offers: OfferCreateManyWithoutCarInput
}

input CarCreateManyWithoutOwnerInput {
  create: [CarCreateWithoutOwnerInput!]
  connect: [CarWhereUniqueInput!]
}

input CarCreateOneWithoutOffersInput {
  create: CarCreateWithoutOffersInput
  connect: CarWhereUniqueInput
}

input CarCreatephotosInput {
  set: [String!]
}

input CarCreateWithoutOffersInput {
  owner: UserCreateOneWithoutCarsInput!
  manufacturer: ManufacturerCreateOneInput!
  model: CarModelCreateOneInput!
  category: CarCategoryCreateOneInput!
  year: Int!
  mileage: Int!
  photos: CarCreatephotosInput
  features: CarFeatureCreateManyInput
  status: CarStatus
}

input CarCreateWithoutOwnerInput {
  manufacturer: ManufacturerCreateOneInput!
  model: CarModelCreateOneInput!
  category: CarCategoryCreateOneInput!
  year: Int!
  mileage: Int!
  photos: CarCreatephotosInput
  features: CarFeatureCreateManyInput
  status: CarStatus
  offers: OfferCreateManyWithoutCarInput
}

type CarEdge {
  node: Car!
  cursor: String!
}

type CarFeature {
  id: ID!
  name: String!
  category: CarFeatureCategory!
}

type CarFeatureCategory {
  id: ID!
  name: String!
  type: CarFeatureType!
  features(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeature!]
}

type CarFeatureCategoryConnection {
  pageInfo: PageInfo!
  edges: [CarFeatureCategoryEdge]!
  aggregate: AggregateCarFeatureCategory!
}

input CarFeatureCategoryCreateInput {
  name: String!
  type: CarFeatureType!
  features: CarFeatureCreateManyWithoutCategoryInput
}

input CarFeatureCategoryCreateOneWithoutFeaturesInput {
  create: CarFeatureCategoryCreateWithoutFeaturesInput
  connect: CarFeatureCategoryWhereUniqueInput
}

input CarFeatureCategoryCreateWithoutFeaturesInput {
  name: String!
  type: CarFeatureType!
}

type CarFeatureCategoryEdge {
  node: CarFeatureCategory!
  cursor: String!
}

enum CarFeatureCategoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarFeatureCategoryPreviousValues {
  id: ID!
  name: String!
  type: CarFeatureType!
}

type CarFeatureCategorySubscriptionPayload {
  mutation: MutationType!
  node: CarFeatureCategory
  updatedFields: [String!]
  previousValues: CarFeatureCategoryPreviousValues
}

input CarFeatureCategorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarFeatureCategoryWhereInput
  AND: [CarFeatureCategorySubscriptionWhereInput!]
  OR: [CarFeatureCategorySubscriptionWhereInput!]
  NOT: [CarFeatureCategorySubscriptionWhereInput!]
}

input CarFeatureCategoryUpdateInput {
  name: String
  type: CarFeatureType
  features: CarFeatureUpdateManyWithoutCategoryInput
}

input CarFeatureCategoryUpdateManyMutationInput {
  name: String
  type: CarFeatureType
}

input CarFeatureCategoryUpdateOneRequiredWithoutFeaturesInput {
  create: CarFeatureCategoryCreateWithoutFeaturesInput
  update: CarFeatureCategoryUpdateWithoutFeaturesDataInput
  upsert: CarFeatureCategoryUpsertWithoutFeaturesInput
  connect: CarFeatureCategoryWhereUniqueInput
}

input CarFeatureCategoryUpdateWithoutFeaturesDataInput {
  name: String
  type: CarFeatureType
}

input CarFeatureCategoryUpsertWithoutFeaturesInput {
  update: CarFeatureCategoryUpdateWithoutFeaturesDataInput!
  create: CarFeatureCategoryCreateWithoutFeaturesInput!
}

input CarFeatureCategoryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  type: CarFeatureType
  type_not: CarFeatureType
  type_in: [CarFeatureType!]
  type_not_in: [CarFeatureType!]
  features_every: CarFeatureWhereInput
  features_some: CarFeatureWhereInput
  features_none: CarFeatureWhereInput
  AND: [CarFeatureCategoryWhereInput!]
  OR: [CarFeatureCategoryWhereInput!]
  NOT: [CarFeatureCategoryWhereInput!]
}

input CarFeatureCategoryWhereUniqueInput {
  id: ID
  name: String
}

type CarFeatureConnection {
  pageInfo: PageInfo!
  edges: [CarFeatureEdge]!
  aggregate: AggregateCarFeature!
}

input CarFeatureCreateInput {
  name: String!
  category: CarFeatureCategoryCreateOneWithoutFeaturesInput!
}

input CarFeatureCreateManyInput {
  create: [CarFeatureCreateInput!]
  connect: [CarFeatureWhereUniqueInput!]
}

input CarFeatureCreateManyWithoutCategoryInput {
  create: [CarFeatureCreateWithoutCategoryInput!]
  connect: [CarFeatureWhereUniqueInput!]
}

input CarFeatureCreateWithoutCategoryInput {
  name: String!
}

type CarFeatureEdge {
  node: CarFeature!
  cursor: String!
}

enum CarFeatureOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarFeaturePreviousValues {
  id: ID!
  name: String!
}

input CarFeatureScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CarFeatureScalarWhereInput!]
  OR: [CarFeatureScalarWhereInput!]
  NOT: [CarFeatureScalarWhereInput!]
}

type CarFeatureSubscriptionPayload {
  mutation: MutationType!
  node: CarFeature
  updatedFields: [String!]
  previousValues: CarFeaturePreviousValues
}

input CarFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarFeatureWhereInput
  AND: [CarFeatureSubscriptionWhereInput!]
  OR: [CarFeatureSubscriptionWhereInput!]
  NOT: [CarFeatureSubscriptionWhereInput!]
}

enum CarFeatureType {
  TRUE_FALSE
  MULTIPLE_CHOICE
}

input CarFeatureUpdateDataInput {
  name: String
  category: CarFeatureCategoryUpdateOneRequiredWithoutFeaturesInput
}

input CarFeatureUpdateInput {
  name: String
  category: CarFeatureCategoryUpdateOneRequiredWithoutFeaturesInput
}

input CarFeatureUpdateManyDataInput {
  name: String
}

input CarFeatureUpdateManyInput {
  create: [CarFeatureCreateInput!]
  update: [CarFeatureUpdateWithWhereUniqueNestedInput!]
  upsert: [CarFeatureUpsertWithWhereUniqueNestedInput!]
  delete: [CarFeatureWhereUniqueInput!]
  connect: [CarFeatureWhereUniqueInput!]
  disconnect: [CarFeatureWhereUniqueInput!]
  deleteMany: [CarFeatureScalarWhereInput!]
  updateMany: [CarFeatureUpdateManyWithWhereNestedInput!]
}

input CarFeatureUpdateManyMutationInput {
  name: String
}

input CarFeatureUpdateManyWithoutCategoryInput {
  create: [CarFeatureCreateWithoutCategoryInput!]
  delete: [CarFeatureWhereUniqueInput!]
  connect: [CarFeatureWhereUniqueInput!]
  disconnect: [CarFeatureWhereUniqueInput!]
  update: [CarFeatureUpdateWithWhereUniqueWithoutCategoryInput!]
  upsert: [CarFeatureUpsertWithWhereUniqueWithoutCategoryInput!]
  deleteMany: [CarFeatureScalarWhereInput!]
  updateMany: [CarFeatureUpdateManyWithWhereNestedInput!]
}

input CarFeatureUpdateManyWithWhereNestedInput {
  where: CarFeatureScalarWhereInput!
  data: CarFeatureUpdateManyDataInput!
}

input CarFeatureUpdateWithoutCategoryDataInput {
  name: String
}

input CarFeatureUpdateWithWhereUniqueNestedInput {
  where: CarFeatureWhereUniqueInput!
  data: CarFeatureUpdateDataInput!
}

input CarFeatureUpdateWithWhereUniqueWithoutCategoryInput {
  where: CarFeatureWhereUniqueInput!
  data: CarFeatureUpdateWithoutCategoryDataInput!
}

input CarFeatureUpsertWithWhereUniqueNestedInput {
  where: CarFeatureWhereUniqueInput!
  update: CarFeatureUpdateDataInput!
  create: CarFeatureCreateInput!
}

input CarFeatureUpsertWithWhereUniqueWithoutCategoryInput {
  where: CarFeatureWhereUniqueInput!
  update: CarFeatureUpdateWithoutCategoryDataInput!
  create: CarFeatureCreateWithoutCategoryInput!
}

input CarFeatureWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  category: CarFeatureCategoryWhereInput
  AND: [CarFeatureWhereInput!]
  OR: [CarFeatureWhereInput!]
  NOT: [CarFeatureWhereInput!]
}

input CarFeatureWhereUniqueInput {
  id: ID
}

type CarModel {
  id: ID!
  name: String!
}

type CarModelConnection {
  pageInfo: PageInfo!
  edges: [CarModelEdge]!
  aggregate: AggregateCarModel!
}

input CarModelCreateInput {
  name: String!
}

input CarModelCreateManyInput {
  create: [CarModelCreateInput!]
  connect: [CarModelWhereUniqueInput!]
}

input CarModelCreateOneInput {
  create: CarModelCreateInput
  connect: CarModelWhereUniqueInput
}

type CarModelEdge {
  node: CarModel!
  cursor: String!
}

enum CarModelOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarModelPreviousValues {
  id: ID!
  name: String!
}

input CarModelScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CarModelScalarWhereInput!]
  OR: [CarModelScalarWhereInput!]
  NOT: [CarModelScalarWhereInput!]
}

type CarModelSubscriptionPayload {
  mutation: MutationType!
  node: CarModel
  updatedFields: [String!]
  previousValues: CarModelPreviousValues
}

input CarModelSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarModelWhereInput
  AND: [CarModelSubscriptionWhereInput!]
  OR: [CarModelSubscriptionWhereInput!]
  NOT: [CarModelSubscriptionWhereInput!]
}

input CarModelUpdateDataInput {
  name: String
}

input CarModelUpdateInput {
  name: String
}

input CarModelUpdateManyDataInput {
  name: String
}

input CarModelUpdateManyInput {
  create: [CarModelCreateInput!]
  update: [CarModelUpdateWithWhereUniqueNestedInput!]
  upsert: [CarModelUpsertWithWhereUniqueNestedInput!]
  delete: [CarModelWhereUniqueInput!]
  connect: [CarModelWhereUniqueInput!]
  disconnect: [CarModelWhereUniqueInput!]
  deleteMany: [CarModelScalarWhereInput!]
  updateMany: [CarModelUpdateManyWithWhereNestedInput!]
}

input CarModelUpdateManyMutationInput {
  name: String
}

input CarModelUpdateManyWithWhereNestedInput {
  where: CarModelScalarWhereInput!
  data: CarModelUpdateManyDataInput!
}

input CarModelUpdateOneInput {
  create: CarModelCreateInput
  update: CarModelUpdateDataInput
  upsert: CarModelUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CarModelWhereUniqueInput
}

input CarModelUpdateOneRequiredInput {
  create: CarModelCreateInput
  update: CarModelUpdateDataInput
  upsert: CarModelUpsertNestedInput
  connect: CarModelWhereUniqueInput
}

input CarModelUpdateWithWhereUniqueNestedInput {
  where: CarModelWhereUniqueInput!
  data: CarModelUpdateDataInput!
}

input CarModelUpsertNestedInput {
  update: CarModelUpdateDataInput!
  create: CarModelCreateInput!
}

input CarModelUpsertWithWhereUniqueNestedInput {
  where: CarModelWhereUniqueInput!
  update: CarModelUpdateDataInput!
  create: CarModelCreateInput!
}

input CarModelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [CarModelWhereInput!]
  OR: [CarModelWhereInput!]
  NOT: [CarModelWhereInput!]
}

input CarModelWhereUniqueInput {
  id: ID
}

enum CarOrderByInput {
  id_ASC
  id_DESC
  year_ASC
  year_DESC
  mileage_ASC
  mileage_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarPreviousValues {
  id: ID!
  year: Int!
  mileage: Int!
  photos: [String!]!
  status: CarStatus!
}

input CarScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  mileage: Int
  mileage_not: Int
  mileage_in: [Int!]
  mileage_not_in: [Int!]
  mileage_lt: Int
  mileage_lte: Int
  mileage_gt: Int
  mileage_gte: Int
  status: CarStatus
  status_not: CarStatus
  status_in: [CarStatus!]
  status_not_in: [CarStatus!]
  AND: [CarScalarWhereInput!]
  OR: [CarScalarWhereInput!]
  NOT: [CarScalarWhereInput!]
}

enum CarStatus {
  PUBLISHED
  SOLD
  DELETED
}

type CarSubscriptionPayload {
  mutation: MutationType!
  node: Car
  updatedFields: [String!]
  previousValues: CarPreviousValues
}

input CarSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarWhereInput
  AND: [CarSubscriptionWhereInput!]
  OR: [CarSubscriptionWhereInput!]
  NOT: [CarSubscriptionWhereInput!]
}

input CarUpdateInput {
  owner: UserUpdateOneRequiredWithoutCarsInput
  manufacturer: ManufacturerUpdateOneRequiredInput
  model: CarModelUpdateOneRequiredInput
  category: CarCategoryUpdateOneRequiredInput
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  features: CarFeatureUpdateManyInput
  status: CarStatus
  offers: OfferUpdateManyWithoutCarInput
}

input CarUpdateManyDataInput {
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  status: CarStatus
}

input CarUpdateManyMutationInput {
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  status: CarStatus
}

input CarUpdateManyWithoutOwnerInput {
  create: [CarCreateWithoutOwnerInput!]
  delete: [CarWhereUniqueInput!]
  connect: [CarWhereUniqueInput!]
  disconnect: [CarWhereUniqueInput!]
  update: [CarUpdateWithWhereUniqueWithoutOwnerInput!]
  upsert: [CarUpsertWithWhereUniqueWithoutOwnerInput!]
  deleteMany: [CarScalarWhereInput!]
  updateMany: [CarUpdateManyWithWhereNestedInput!]
}

input CarUpdateManyWithWhereNestedInput {
  where: CarScalarWhereInput!
  data: CarUpdateManyDataInput!
}

input CarUpdateOneRequiredWithoutOffersInput {
  create: CarCreateWithoutOffersInput
  update: CarUpdateWithoutOffersDataInput
  upsert: CarUpsertWithoutOffersInput
  connect: CarWhereUniqueInput
}

input CarUpdatephotosInput {
  set: [String!]
}

input CarUpdateWithoutOffersDataInput {
  owner: UserUpdateOneRequiredWithoutCarsInput
  manufacturer: ManufacturerUpdateOneRequiredInput
  model: CarModelUpdateOneRequiredInput
  category: CarCategoryUpdateOneRequiredInput
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  features: CarFeatureUpdateManyInput
  status: CarStatus
}

input CarUpdateWithoutOwnerDataInput {
  manufacturer: ManufacturerUpdateOneRequiredInput
  model: CarModelUpdateOneRequiredInput
  category: CarCategoryUpdateOneRequiredInput
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  features: CarFeatureUpdateManyInput
  status: CarStatus
  offers: OfferUpdateManyWithoutCarInput
}

input CarUpdateWithWhereUniqueWithoutOwnerInput {
  where: CarWhereUniqueInput!
  data: CarUpdateWithoutOwnerDataInput!
}

input CarUpsertWithoutOffersInput {
  update: CarUpdateWithoutOffersDataInput!
  create: CarCreateWithoutOffersInput!
}

input CarUpsertWithWhereUniqueWithoutOwnerInput {
  where: CarWhereUniqueInput!
  update: CarUpdateWithoutOwnerDataInput!
  create: CarCreateWithoutOwnerInput!
}

input CarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  owner: UserWhereInput
  manufacturer: ManufacturerWhereInput
  model: CarModelWhereInput
  category: CarCategoryWhereInput
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  mileage: Int
  mileage_not: Int
  mileage_in: [Int!]
  mileage_not_in: [Int!]
  mileage_lt: Int
  mileage_lte: Int
  mileage_gt: Int
  mileage_gte: Int
  features_every: CarFeatureWhereInput
  features_some: CarFeatureWhereInput
  features_none: CarFeatureWhereInput
  status: CarStatus
  status_not: CarStatus
  status_in: [CarStatus!]
  status_not_in: [CarStatus!]
  offers_every: OfferWhereInput
  offers_some: OfferWhereInput
  offers_none: OfferWhereInput
  AND: [CarWhereInput!]
  OR: [CarWhereInput!]
  NOT: [CarWhereInput!]
}

input CarWhereUniqueInput {
  id: ID
}

type Conversation {
  id: ID!
  offer: Offer!
  buyer: User!
  seller: User!
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
}

type ConversationConnection {
  pageInfo: PageInfo!
  edges: [ConversationEdge]!
  aggregate: AggregateConversation!
}

input ConversationCreateInput {
  offer: OfferCreateOneWithoutConversationInput!
  buyer: UserCreateOneWithoutConversationsInput!
  seller: UserCreateOneInput!
  messages: MessageCreateManyWithoutConversationInput
}

input ConversationCreateManyWithoutBuyerInput {
  create: [ConversationCreateWithoutBuyerInput!]
  connect: [ConversationWhereUniqueInput!]
}

input ConversationCreateOneWithoutMessagesInput {
  create: ConversationCreateWithoutMessagesInput
  connect: ConversationWhereUniqueInput
}

input ConversationCreateOneWithoutOfferInput {
  create: ConversationCreateWithoutOfferInput
  connect: ConversationWhereUniqueInput
}

input ConversationCreateWithoutBuyerInput {
  offer: OfferCreateOneWithoutConversationInput!
  seller: UserCreateOneInput!
  messages: MessageCreateManyWithoutConversationInput
}

input ConversationCreateWithoutMessagesInput {
  offer: OfferCreateOneWithoutConversationInput!
  buyer: UserCreateOneWithoutConversationsInput!
  seller: UserCreateOneInput!
}

input ConversationCreateWithoutOfferInput {
  buyer: UserCreateOneWithoutConversationsInput!
  seller: UserCreateOneInput!
  messages: MessageCreateManyWithoutConversationInput
}

type ConversationEdge {
  node: Conversation!
  cursor: String!
}

enum ConversationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ConversationPreviousValues {
  id: ID!
}

input ConversationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [ConversationScalarWhereInput!]
  OR: [ConversationScalarWhereInput!]
  NOT: [ConversationScalarWhereInput!]
}

type ConversationSubscriptionPayload {
  mutation: MutationType!
  node: Conversation
  updatedFields: [String!]
  previousValues: ConversationPreviousValues
}

input ConversationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ConversationWhereInput
  AND: [ConversationSubscriptionWhereInput!]
  OR: [ConversationSubscriptionWhereInput!]
  NOT: [ConversationSubscriptionWhereInput!]
}

input ConversationUpdateInput {
  offer: OfferUpdateOneRequiredWithoutConversationInput
  buyer: UserUpdateOneRequiredWithoutConversationsInput
  seller: UserUpdateOneRequiredInput
  messages: MessageUpdateManyWithoutConversationInput
}

input ConversationUpdateManyWithoutBuyerInput {
  create: [ConversationCreateWithoutBuyerInput!]
  delete: [ConversationWhereUniqueInput!]
  connect: [ConversationWhereUniqueInput!]
  disconnect: [ConversationWhereUniqueInput!]
  update: [ConversationUpdateWithWhereUniqueWithoutBuyerInput!]
  upsert: [ConversationUpsertWithWhereUniqueWithoutBuyerInput!]
  deleteMany: [ConversationScalarWhereInput!]
}

input ConversationUpdateOneRequiredWithoutMessagesInput {
  create: ConversationCreateWithoutMessagesInput
  update: ConversationUpdateWithoutMessagesDataInput
  upsert: ConversationUpsertWithoutMessagesInput
  connect: ConversationWhereUniqueInput
}

input ConversationUpdateOneWithoutOfferInput {
  create: ConversationCreateWithoutOfferInput
  update: ConversationUpdateWithoutOfferDataInput
  upsert: ConversationUpsertWithoutOfferInput
  delete: Boolean
  disconnect: Boolean
  connect: ConversationWhereUniqueInput
}

input ConversationUpdateWithoutBuyerDataInput {
  offer: OfferUpdateOneRequiredWithoutConversationInput
  seller: UserUpdateOneRequiredInput
  messages: MessageUpdateManyWithoutConversationInput
}

input ConversationUpdateWithoutMessagesDataInput {
  offer: OfferUpdateOneRequiredWithoutConversationInput
  buyer: UserUpdateOneRequiredWithoutConversationsInput
  seller: UserUpdateOneRequiredInput
}

input ConversationUpdateWithoutOfferDataInput {
  buyer: UserUpdateOneRequiredWithoutConversationsInput
  seller: UserUpdateOneRequiredInput
  messages: MessageUpdateManyWithoutConversationInput
}

input ConversationUpdateWithWhereUniqueWithoutBuyerInput {
  where: ConversationWhereUniqueInput!
  data: ConversationUpdateWithoutBuyerDataInput!
}

input ConversationUpsertWithoutMessagesInput {
  update: ConversationUpdateWithoutMessagesDataInput!
  create: ConversationCreateWithoutMessagesInput!
}

input ConversationUpsertWithoutOfferInput {
  update: ConversationUpdateWithoutOfferDataInput!
  create: ConversationCreateWithoutOfferInput!
}

input ConversationUpsertWithWhereUniqueWithoutBuyerInput {
  where: ConversationWhereUniqueInput!
  update: ConversationUpdateWithoutBuyerDataInput!
  create: ConversationCreateWithoutBuyerInput!
}

input ConversationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  offer: OfferWhereInput
  buyer: UserWhereInput
  seller: UserWhereInput
  messages_every: MessageWhereInput
  messages_some: MessageWhereInput
  messages_none: MessageWhereInput
  AND: [ConversationWhereInput!]
  OR: [ConversationWhereInput!]
  NOT: [ConversationWhereInput!]
}

input ConversationWhereUniqueInput {
  id: ID
}

type Date {
  day: Int!
  month: Int!
  year: Int!
}

type DateConnection {
  pageInfo: PageInfo!
  edges: [DateEdge]!
  aggregate: AggregateDate!
}

input DateCreateInput {
  day: Int!
  month: Int!
  year: Int!
}

input DateCreateOneInput {
  create: DateCreateInput
}

type DateEdge {
  node: Date!
  cursor: String!
}

enum DateOrderByInput {
  day_ASC
  day_DESC
  month_ASC
  month_DESC
  year_ASC
  year_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DatePreviousValues {
  day: Int!
  month: Int!
  year: Int!
}

type DateSubscriptionPayload {
  mutation: MutationType!
  node: Date
  updatedFields: [String!]
  previousValues: DatePreviousValues
}

input DateSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DateWhereInput
  AND: [DateSubscriptionWhereInput!]
  OR: [DateSubscriptionWhereInput!]
  NOT: [DateSubscriptionWhereInput!]
}

scalar DateTime

input DateUpdateDataInput {
  day: Int
  month: Int
  year: Int
}

input DateUpdateManyMutationInput {
  day: Int
  month: Int
  year: Int
}

input DateUpdateOneRequiredInput {
  create: DateCreateInput
  update: DateUpdateDataInput
  upsert: DateUpsertNestedInput
}

input DateUpsertNestedInput {
  update: DateUpdateDataInput!
  create: DateCreateInput!
}

input DateWhereInput {
  day: Int
  day_not: Int
  day_in: [Int!]
  day_not_in: [Int!]
  day_lt: Int
  day_lte: Int
  day_gt: Int
  day_gte: Int
  month: Int
  month_not: Int
  month_in: [Int!]
  month_not_in: [Int!]
  month_lt: Int
  month_lte: Int
  month_gt: Int
  month_gte: Int
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  AND: [DateWhereInput!]
  OR: [DateWhereInput!]
  NOT: [DateWhereInput!]
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

scalar Long

type Manufacturer {
  id: ID!
  name: String!
  models(where: CarModelWhereInput, orderBy: CarModelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarModel!]
}

type ManufacturerConnection {
  pageInfo: PageInfo!
  edges: [ManufacturerEdge]!
  aggregate: AggregateManufacturer!
}

input ManufacturerCreateInput {
  name: String!
  models: CarModelCreateManyInput
}

input ManufacturerCreateOneInput {
  create: ManufacturerCreateInput
  connect: ManufacturerWhereUniqueInput
}

type ManufacturerEdge {
  node: Manufacturer!
  cursor: String!
}

enum ManufacturerOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ManufacturerPreviousValues {
  id: ID!
  name: String!
}

type ManufacturerSubscriptionPayload {
  mutation: MutationType!
  node: Manufacturer
  updatedFields: [String!]
  previousValues: ManufacturerPreviousValues
}

input ManufacturerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ManufacturerWhereInput
  AND: [ManufacturerSubscriptionWhereInput!]
  OR: [ManufacturerSubscriptionWhereInput!]
  NOT: [ManufacturerSubscriptionWhereInput!]
}

input ManufacturerUpdateDataInput {
  name: String
  models: CarModelUpdateManyInput
}

input ManufacturerUpdateInput {
  name: String
  models: CarModelUpdateManyInput
}

input ManufacturerUpdateManyMutationInput {
  name: String
}

input ManufacturerUpdateOneInput {
  create: ManufacturerCreateInput
  update: ManufacturerUpdateDataInput
  upsert: ManufacturerUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ManufacturerWhereUniqueInput
}

input ManufacturerUpdateOneRequiredInput {
  create: ManufacturerCreateInput
  update: ManufacturerUpdateDataInput
  upsert: ManufacturerUpsertNestedInput
  connect: ManufacturerWhereUniqueInput
}

input ManufacturerUpsertNestedInput {
  update: ManufacturerUpdateDataInput!
  create: ManufacturerCreateInput!
}

input ManufacturerWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  models_every: CarModelWhereInput
  models_some: CarModelWhereInput
  models_none: CarModelWhereInput
  AND: [ManufacturerWhereInput!]
  OR: [ManufacturerWhereInput!]
  NOT: [ManufacturerWhereInput!]
}

input ManufacturerWhereUniqueInput {
  id: ID
}

type Message {
  id: ID!
  sender: User!
  text: String!
  image: String
  conversation: Conversation!
}

type MessageConnection {
  pageInfo: PageInfo!
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  sender: UserCreateOneInput!
  text: String!
  image: String
  conversation: ConversationCreateOneWithoutMessagesInput!
}

input MessageCreateManyWithoutConversationInput {
  create: [MessageCreateWithoutConversationInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateWithoutConversationInput {
  sender: UserCreateOneInput!
  text: String!
  image: String
}

type MessageEdge {
  node: Message!
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  image_ASC
  image_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MessagePreviousValues {
  id: ID!
  text: String!
  image: String
}

input MessageScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  AND: [MessageScalarWhereInput!]
  OR: [MessageScalarWhereInput!]
  NOT: [MessageScalarWhereInput!]
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
  AND: [MessageSubscriptionWhereInput!]
  OR: [MessageSubscriptionWhereInput!]
  NOT: [MessageSubscriptionWhereInput!]
}

input MessageUpdateInput {
  sender: UserUpdateOneRequiredInput
  text: String
  image: String
  conversation: ConversationUpdateOneRequiredWithoutMessagesInput
}

input MessageUpdateManyDataInput {
  text: String
  image: String
}

input MessageUpdateManyMutationInput {
  text: String
  image: String
}

input MessageUpdateManyWithoutConversationInput {
  create: [MessageCreateWithoutConversationInput!]
  delete: [MessageWhereUniqueInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutConversationInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutConversationInput!]
  deleteMany: [MessageScalarWhereInput!]
  updateMany: [MessageUpdateManyWithWhereNestedInput!]
}

input MessageUpdateManyWithWhereNestedInput {
  where: MessageScalarWhereInput!
  data: MessageUpdateManyDataInput!
}

input MessageUpdateWithoutConversationDataInput {
  sender: UserUpdateOneRequiredInput
  text: String
  image: String
}

input MessageUpdateWithWhereUniqueWithoutConversationInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutConversationDataInput!
}

input MessageUpsertWithWhereUniqueWithoutConversationInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutConversationDataInput!
  create: MessageCreateWithoutConversationInput!
}

input MessageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  sender: UserWhereInput
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  conversation: ConversationWhereInput
  AND: [MessageWhereInput!]
  OR: [MessageWhereInput!]
  NOT: [MessageWhereInput!]
}

input MessageWhereUniqueInput {
  id: ID
}

type Mutation {
  createAd(data: AdCreateInput!): Ad!
  updateAd(data: AdUpdateInput!, where: AdWhereUniqueInput!): Ad
  updateManyAds(data: AdUpdateManyMutationInput!, where: AdWhereInput): BatchPayload!
  upsertAd(where: AdWhereUniqueInput!, create: AdCreateInput!, update: AdUpdateInput!): Ad!
  deleteAd(where: AdWhereUniqueInput!): Ad
  deleteManyAds(where: AdWhereInput): BatchPayload!
  createCar(data: CarCreateInput!): Car!
  updateCar(data: CarUpdateInput!, where: CarWhereUniqueInput!): Car
  updateManyCars(data: CarUpdateManyMutationInput!, where: CarWhereInput): BatchPayload!
  upsertCar(where: CarWhereUniqueInput!, create: CarCreateInput!, update: CarUpdateInput!): Car!
  deleteCar(where: CarWhereUniqueInput!): Car
  deleteManyCars(where: CarWhereInput): BatchPayload!
  createCarCategory(data: CarCategoryCreateInput!): CarCategory!
  updateCarCategory(data: CarCategoryUpdateInput!, where: CarCategoryWhereUniqueInput!): CarCategory
  updateManyCarCategories(data: CarCategoryUpdateManyMutationInput!, where: CarCategoryWhereInput): BatchPayload!
  upsertCarCategory(where: CarCategoryWhereUniqueInput!, create: CarCategoryCreateInput!, update: CarCategoryUpdateInput!): CarCategory!
  deleteCarCategory(where: CarCategoryWhereUniqueInput!): CarCategory
  deleteManyCarCategories(where: CarCategoryWhereInput): BatchPayload!
  createCarFeature(data: CarFeatureCreateInput!): CarFeature!
  updateCarFeature(data: CarFeatureUpdateInput!, where: CarFeatureWhereUniqueInput!): CarFeature
  updateManyCarFeatures(data: CarFeatureUpdateManyMutationInput!, where: CarFeatureWhereInput): BatchPayload!
  upsertCarFeature(where: CarFeatureWhereUniqueInput!, create: CarFeatureCreateInput!, update: CarFeatureUpdateInput!): CarFeature!
  deleteCarFeature(where: CarFeatureWhereUniqueInput!): CarFeature
  deleteManyCarFeatures(where: CarFeatureWhereInput): BatchPayload!
  createCarFeatureCategory(data: CarFeatureCategoryCreateInput!): CarFeatureCategory!
  updateCarFeatureCategory(data: CarFeatureCategoryUpdateInput!, where: CarFeatureCategoryWhereUniqueInput!): CarFeatureCategory
  updateManyCarFeatureCategories(data: CarFeatureCategoryUpdateManyMutationInput!, where: CarFeatureCategoryWhereInput): BatchPayload!
  upsertCarFeatureCategory(where: CarFeatureCategoryWhereUniqueInput!, create: CarFeatureCategoryCreateInput!, update: CarFeatureCategoryUpdateInput!): CarFeatureCategory!
  deleteCarFeatureCategory(where: CarFeatureCategoryWhereUniqueInput!): CarFeatureCategory
  deleteManyCarFeatureCategories(where: CarFeatureCategoryWhereInput): BatchPayload!
  createCarModel(data: CarModelCreateInput!): CarModel!
  updateCarModel(data: CarModelUpdateInput!, where: CarModelWhereUniqueInput!): CarModel
  updateManyCarModels(data: CarModelUpdateManyMutationInput!, where: CarModelWhereInput): BatchPayload!
  upsertCarModel(where: CarModelWhereUniqueInput!, create: CarModelCreateInput!, update: CarModelUpdateInput!): CarModel!
  deleteCarModel(where: CarModelWhereUniqueInput!): CarModel
  deleteManyCarModels(where: CarModelWhereInput): BatchPayload!
  createConversation(data: ConversationCreateInput!): Conversation!
  updateConversation(data: ConversationUpdateInput!, where: ConversationWhereUniqueInput!): Conversation
  upsertConversation(where: ConversationWhereUniqueInput!, create: ConversationCreateInput!, update: ConversationUpdateInput!): Conversation!
  deleteConversation(where: ConversationWhereUniqueInput!): Conversation
  deleteManyConversations(where: ConversationWhereInput): BatchPayload!
  createDate(data: DateCreateInput!): Date!
  updateManyDates(data: DateUpdateManyMutationInput!, where: DateWhereInput): BatchPayload!
  deleteManyDates(where: DateWhereInput): BatchPayload!
  createManufacturer(data: ManufacturerCreateInput!): Manufacturer!
  updateManufacturer(data: ManufacturerUpdateInput!, where: ManufacturerWhereUniqueInput!): Manufacturer
  updateManyManufacturers(data: ManufacturerUpdateManyMutationInput!, where: ManufacturerWhereInput): BatchPayload!
  upsertManufacturer(where: ManufacturerWhereUniqueInput!, create: ManufacturerCreateInput!, update: ManufacturerUpdateInput!): Manufacturer!
  deleteManufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  deleteManyManufacturers(where: ManufacturerWhereInput): BatchPayload!
  createMessage(data: MessageCreateInput!): Message!
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateManyMessages(data: MessageUpdateManyMutationInput!, where: MessageWhereInput): BatchPayload!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  createOffer(data: OfferCreateInput!): Offer!
  updateOffer(data: OfferUpdateInput!, where: OfferWhereUniqueInput!): Offer
  updateManyOffers(data: OfferUpdateManyMutationInput!, where: OfferWhereInput): BatchPayload!
  upsertOffer(where: OfferWhereUniqueInput!, create: OfferCreateInput!, update: OfferUpdateInput!): Offer!
  deleteOffer(where: OfferWhereUniqueInput!): Offer
  deleteManyOffers(where: OfferWhereInput): BatchPayload!
  createOfferAddon(data: OfferAddonCreateInput!): OfferAddon!
  updateOfferAddon(data: OfferAddonUpdateInput!, where: OfferAddonWhereUniqueInput!): OfferAddon
  updateManyOfferAddons(data: OfferAddonUpdateManyMutationInput!, where: OfferAddonWhereInput): BatchPayload!
  upsertOfferAddon(where: OfferAddonWhereUniqueInput!, create: OfferAddonCreateInput!, update: OfferAddonUpdateInput!): OfferAddon!
  deleteOfferAddon(where: OfferAddonWhereUniqueInput!): OfferAddon
  deleteManyOfferAddons(where: OfferAddonWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Offer {
  id: ID!
  creator: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  ad: Ad!
  car: Car!
  price: Float!
  status: OfferStatus!
  finalRank: Int
  addons(where: OfferAddonWhereInput, orderBy: OfferAddonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OfferAddon!]
  conversation: Conversation
}

type OfferAddon {
  id: ID!
  name: String!
  rankValue: Int!
}

type OfferAddonConnection {
  pageInfo: PageInfo!
  edges: [OfferAddonEdge]!
  aggregate: AggregateOfferAddon!
}

input OfferAddonCreateInput {
  name: String!
  rankValue: Int
}

input OfferAddonCreateManyInput {
  create: [OfferAddonCreateInput!]
  connect: [OfferAddonWhereUniqueInput!]
}

type OfferAddonEdge {
  node: OfferAddon!
  cursor: String!
}

enum OfferAddonOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  rankValue_ASC
  rankValue_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type OfferAddonPreviousValues {
  id: ID!
  name: String!
  rankValue: Int!
}

input OfferAddonScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  rankValue: Int
  rankValue_not: Int
  rankValue_in: [Int!]
  rankValue_not_in: [Int!]
  rankValue_lt: Int
  rankValue_lte: Int
  rankValue_gt: Int
  rankValue_gte: Int
  AND: [OfferAddonScalarWhereInput!]
  OR: [OfferAddonScalarWhereInput!]
  NOT: [OfferAddonScalarWhereInput!]
}

type OfferAddonSubscriptionPayload {
  mutation: MutationType!
  node: OfferAddon
  updatedFields: [String!]
  previousValues: OfferAddonPreviousValues
}

input OfferAddonSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OfferAddonWhereInput
  AND: [OfferAddonSubscriptionWhereInput!]
  OR: [OfferAddonSubscriptionWhereInput!]
  NOT: [OfferAddonSubscriptionWhereInput!]
}

input OfferAddonUpdateDataInput {
  name: String
  rankValue: Int
}

input OfferAddonUpdateInput {
  name: String
  rankValue: Int
}

input OfferAddonUpdateManyDataInput {
  name: String
  rankValue: Int
}

input OfferAddonUpdateManyInput {
  create: [OfferAddonCreateInput!]
  update: [OfferAddonUpdateWithWhereUniqueNestedInput!]
  upsert: [OfferAddonUpsertWithWhereUniqueNestedInput!]
  delete: [OfferAddonWhereUniqueInput!]
  connect: [OfferAddonWhereUniqueInput!]
  disconnect: [OfferAddonWhereUniqueInput!]
  deleteMany: [OfferAddonScalarWhereInput!]
  updateMany: [OfferAddonUpdateManyWithWhereNestedInput!]
}

input OfferAddonUpdateManyMutationInput {
  name: String
  rankValue: Int
}

input OfferAddonUpdateManyWithWhereNestedInput {
  where: OfferAddonScalarWhereInput!
  data: OfferAddonUpdateManyDataInput!
}

input OfferAddonUpdateWithWhereUniqueNestedInput {
  where: OfferAddonWhereUniqueInput!
  data: OfferAddonUpdateDataInput!
}

input OfferAddonUpsertWithWhereUniqueNestedInput {
  where: OfferAddonWhereUniqueInput!
  update: OfferAddonUpdateDataInput!
  create: OfferAddonCreateInput!
}

input OfferAddonWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  rankValue: Int
  rankValue_not: Int
  rankValue_in: [Int!]
  rankValue_not_in: [Int!]
  rankValue_lt: Int
  rankValue_lte: Int
  rankValue_gt: Int
  rankValue_gte: Int
  AND: [OfferAddonWhereInput!]
  OR: [OfferAddonWhereInput!]
  NOT: [OfferAddonWhereInput!]
}

input OfferAddonWhereUniqueInput {
  id: ID
}

type OfferConnection {
  pageInfo: PageInfo!
  edges: [OfferEdge]!
  aggregate: AggregateOffer!
}

input OfferCreateInput {
  creator: UserCreateOneWithoutOffersInput!
  ad: AdCreateOneWithoutOffersInput!
  car: CarCreateOneWithoutOffersInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonCreateManyInput
  conversation: ConversationCreateOneWithoutOfferInput
}

input OfferCreateManyWithoutAdInput {
  create: [OfferCreateWithoutAdInput!]
  connect: [OfferWhereUniqueInput!]
}

input OfferCreateManyWithoutCarInput {
  create: [OfferCreateWithoutCarInput!]
  connect: [OfferWhereUniqueInput!]
}

input OfferCreateManyWithoutCreatorInput {
  create: [OfferCreateWithoutCreatorInput!]
  connect: [OfferWhereUniqueInput!]
}

input OfferCreateOneWithoutConversationInput {
  create: OfferCreateWithoutConversationInput
  connect: OfferWhereUniqueInput
}

input OfferCreateWithoutAdInput {
  creator: UserCreateOneWithoutOffersInput!
  car: CarCreateOneWithoutOffersInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonCreateManyInput
  conversation: ConversationCreateOneWithoutOfferInput
}

input OfferCreateWithoutCarInput {
  creator: UserCreateOneWithoutOffersInput!
  ad: AdCreateOneWithoutOffersInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonCreateManyInput
  conversation: ConversationCreateOneWithoutOfferInput
}

input OfferCreateWithoutConversationInput {
  creator: UserCreateOneWithoutOffersInput!
  ad: AdCreateOneWithoutOffersInput!
  car: CarCreateOneWithoutOffersInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonCreateManyInput
}

input OfferCreateWithoutCreatorInput {
  ad: AdCreateOneWithoutOffersInput!
  car: CarCreateOneWithoutOffersInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonCreateManyInput
  conversation: ConversationCreateOneWithoutOfferInput
}

type OfferEdge {
  node: Offer!
  cursor: String!
}

enum OfferOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  price_ASC
  price_DESC
  status_ASC
  status_DESC
  finalRank_ASC
  finalRank_DESC
}

type OfferPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  price: Float!
  status: OfferStatus!
  finalRank: Int
}

input OfferScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  status: OfferStatus
  status_not: OfferStatus
  status_in: [OfferStatus!]
  status_not_in: [OfferStatus!]
  finalRank: Int
  finalRank_not: Int
  finalRank_in: [Int!]
  finalRank_not_in: [Int!]
  finalRank_lt: Int
  finalRank_lte: Int
  finalRank_gt: Int
  finalRank_gte: Int
  AND: [OfferScalarWhereInput!]
  OR: [OfferScalarWhereInput!]
  NOT: [OfferScalarWhereInput!]
}

enum OfferStatus {
  PUBLISHED
  ACCEPTED
  DELETED
}

type OfferSubscriptionPayload {
  mutation: MutationType!
  node: Offer
  updatedFields: [String!]
  previousValues: OfferPreviousValues
}

input OfferSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OfferWhereInput
  AND: [OfferSubscriptionWhereInput!]
  OR: [OfferSubscriptionWhereInput!]
  NOT: [OfferSubscriptionWhereInput!]
}

input OfferUpdateInput {
  creator: UserUpdateOneRequiredWithoutOffersInput
  ad: AdUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredWithoutOffersInput
  price: Float
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonUpdateManyInput
  conversation: ConversationUpdateOneWithoutOfferInput
}

input OfferUpdateManyDataInput {
  price: Float
  status: OfferStatus
  finalRank: Int
}

input OfferUpdateManyMutationInput {
  price: Float
  status: OfferStatus
  finalRank: Int
}

input OfferUpdateManyWithoutAdInput {
  create: [OfferCreateWithoutAdInput!]
  delete: [OfferWhereUniqueInput!]
  connect: [OfferWhereUniqueInput!]
  disconnect: [OfferWhereUniqueInput!]
  update: [OfferUpdateWithWhereUniqueWithoutAdInput!]
  upsert: [OfferUpsertWithWhereUniqueWithoutAdInput!]
  deleteMany: [OfferScalarWhereInput!]
  updateMany: [OfferUpdateManyWithWhereNestedInput!]
}

input OfferUpdateManyWithoutCarInput {
  create: [OfferCreateWithoutCarInput!]
  delete: [OfferWhereUniqueInput!]
  connect: [OfferWhereUniqueInput!]
  disconnect: [OfferWhereUniqueInput!]
  update: [OfferUpdateWithWhereUniqueWithoutCarInput!]
  upsert: [OfferUpsertWithWhereUniqueWithoutCarInput!]
  deleteMany: [OfferScalarWhereInput!]
  updateMany: [OfferUpdateManyWithWhereNestedInput!]
}

input OfferUpdateManyWithoutCreatorInput {
  create: [OfferCreateWithoutCreatorInput!]
  delete: [OfferWhereUniqueInput!]
  connect: [OfferWhereUniqueInput!]
  disconnect: [OfferWhereUniqueInput!]
  update: [OfferUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [OfferUpsertWithWhereUniqueWithoutCreatorInput!]
  deleteMany: [OfferScalarWhereInput!]
  updateMany: [OfferUpdateManyWithWhereNestedInput!]
}

input OfferUpdateManyWithWhereNestedInput {
  where: OfferScalarWhereInput!
  data: OfferUpdateManyDataInput!
}

input OfferUpdateOneRequiredWithoutConversationInput {
  create: OfferCreateWithoutConversationInput
  update: OfferUpdateWithoutConversationDataInput
  upsert: OfferUpsertWithoutConversationInput
  connect: OfferWhereUniqueInput
}

input OfferUpdateWithoutAdDataInput {
  creator: UserUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredWithoutOffersInput
  price: Float
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonUpdateManyInput
  conversation: ConversationUpdateOneWithoutOfferInput
}

input OfferUpdateWithoutCarDataInput {
  creator: UserUpdateOneRequiredWithoutOffersInput
  ad: AdUpdateOneRequiredWithoutOffersInput
  price: Float
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonUpdateManyInput
  conversation: ConversationUpdateOneWithoutOfferInput
}

input OfferUpdateWithoutConversationDataInput {
  creator: UserUpdateOneRequiredWithoutOffersInput
  ad: AdUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredWithoutOffersInput
  price: Float
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonUpdateManyInput
}

input OfferUpdateWithoutCreatorDataInput {
  ad: AdUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredWithoutOffersInput
  price: Float
  status: OfferStatus
  finalRank: Int
  addons: OfferAddonUpdateManyInput
  conversation: ConversationUpdateOneWithoutOfferInput
}

input OfferUpdateWithWhereUniqueWithoutAdInput {
  where: OfferWhereUniqueInput!
  data: OfferUpdateWithoutAdDataInput!
}

input OfferUpdateWithWhereUniqueWithoutCarInput {
  where: OfferWhereUniqueInput!
  data: OfferUpdateWithoutCarDataInput!
}

input OfferUpdateWithWhereUniqueWithoutCreatorInput {
  where: OfferWhereUniqueInput!
  data: OfferUpdateWithoutCreatorDataInput!
}

input OfferUpsertWithoutConversationInput {
  update: OfferUpdateWithoutConversationDataInput!
  create: OfferCreateWithoutConversationInput!
}

input OfferUpsertWithWhereUniqueWithoutAdInput {
  where: OfferWhereUniqueInput!
  update: OfferUpdateWithoutAdDataInput!
  create: OfferCreateWithoutAdInput!
}

input OfferUpsertWithWhereUniqueWithoutCarInput {
  where: OfferWhereUniqueInput!
  update: OfferUpdateWithoutCarDataInput!
  create: OfferCreateWithoutCarInput!
}

input OfferUpsertWithWhereUniqueWithoutCreatorInput {
  where: OfferWhereUniqueInput!
  update: OfferUpdateWithoutCreatorDataInput!
  create: OfferCreateWithoutCreatorInput!
}

input OfferWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  creator: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  ad: AdWhereInput
  car: CarWhereInput
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  status: OfferStatus
  status_not: OfferStatus
  status_in: [OfferStatus!]
  status_not_in: [OfferStatus!]
  finalRank: Int
  finalRank_not: Int
  finalRank_in: [Int!]
  finalRank_not_in: [Int!]
  finalRank_lt: Int
  finalRank_lte: Int
  finalRank_gt: Int
  finalRank_gte: Int
  addons_every: OfferAddonWhereInput
  addons_some: OfferAddonWhereInput
  addons_none: OfferAddonWhereInput
  conversation: ConversationWhereInput
  AND: [OfferWhereInput!]
  OR: [OfferWhereInput!]
  NOT: [OfferWhereInput!]
}

input OfferWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum Permission {
  USER
  PREMIUM
  ADMIN
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
  author: User!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String!
  author: UserCreateOneInput!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredInput
}

input PostUpdateManyMutationInput {
  published: Boolean
  title: String
  content: String
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  ad(where: AdWhereUniqueInput!): Ad
  ads(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ad]!
  adsConnection(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AdConnection!
  car(where: CarWhereUniqueInput!): Car
  cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car]!
  carsConnection(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarConnection!
  carCategory(where: CarCategoryWhereUniqueInput!): CarCategory
  carCategories(where: CarCategoryWhereInput, orderBy: CarCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarCategory]!
  carCategoriesConnection(where: CarCategoryWhereInput, orderBy: CarCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarCategoryConnection!
  carFeature(where: CarFeatureWhereUniqueInput!): CarFeature
  carFeatures(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeature]!
  carFeaturesConnection(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarFeatureConnection!
  carFeatureCategory(where: CarFeatureCategoryWhereUniqueInput!): CarFeatureCategory
  carFeatureCategories(where: CarFeatureCategoryWhereInput, orderBy: CarFeatureCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeatureCategory]!
  carFeatureCategoriesConnection(where: CarFeatureCategoryWhereInput, orderBy: CarFeatureCategoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarFeatureCategoryConnection!
  carModel(where: CarModelWhereUniqueInput!): CarModel
  carModels(where: CarModelWhereInput, orderBy: CarModelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarModel]!
  carModelsConnection(where: CarModelWhereInput, orderBy: CarModelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarModelConnection!
  conversation(where: ConversationWhereUniqueInput!): Conversation
  conversations(where: ConversationWhereInput, orderBy: ConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Conversation]!
  conversationsConnection(where: ConversationWhereInput, orderBy: ConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConversationConnection!
  dates(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Date]!
  datesConnection(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DateConnection!
  manufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  manufacturers(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Manufacturer]!
  manufacturersConnection(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ManufacturerConnection!
  message(where: MessageWhereUniqueInput!): Message
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  offer(where: OfferWhereUniqueInput!): Offer
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer]!
  offersConnection(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OfferConnection!
  offerAddon(where: OfferAddonWhereUniqueInput!): OfferAddon
  offerAddons(where: OfferAddonWhereInput, orderBy: OfferAddonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [OfferAddon]!
  offerAddonsConnection(where: OfferAddonWhereInput, orderBy: OfferAddonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OfferAddonConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  ad(where: AdSubscriptionWhereInput): AdSubscriptionPayload
  car(where: CarSubscriptionWhereInput): CarSubscriptionPayload
  carCategory(where: CarCategorySubscriptionWhereInput): CarCategorySubscriptionPayload
  carFeature(where: CarFeatureSubscriptionWhereInput): CarFeatureSubscriptionPayload
  carFeatureCategory(where: CarFeatureCategorySubscriptionWhereInput): CarFeatureCategorySubscriptionPayload
  carModel(where: CarModelSubscriptionWhereInput): CarModelSubscriptionPayload
  conversation(where: ConversationSubscriptionWhereInput): ConversationSubscriptionPayload
  date(where: DateSubscriptionWhereInput): DateSubscriptionPayload
  manufacturer(where: ManufacturerSubscriptionWhereInput): ManufacturerSubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  offer(where: OfferSubscriptionWhereInput): OfferSubscriptionPayload
  offerAddon(where: OfferAddonSubscriptionWhereInput): OfferAddonSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: Date!
  gender: Gender!
  permissions: [Permission!]!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
  ads(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ad!]
  cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car!]
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations(where: ConversationWhereInput, orderBy: ConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Conversation!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  ads: AdCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationCreateManyWithoutBuyerInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutAdsInput {
  create: UserCreateWithoutAdsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCarsInput {
  create: UserCreateWithoutCarsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutConversationsInput {
  create: UserCreateWithoutConversationsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutOffersInput {
  create: UserCreateWithoutOffersInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreateWithoutAdsInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationCreateManyWithoutBuyerInput
}

input UserCreateWithoutCarsInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  ads: AdCreateManyWithoutCreatorInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationCreateManyWithoutBuyerInput
}

input UserCreateWithoutConversationsInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  ads: AdCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
}

input UserCreateWithoutOffersInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  ads: AdCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationCreateManyWithoutBuyerInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  password_ASC
  password_DESC
  location_ASC
  location_DESC
  gender_ASC
  gender_DESC
  facebookID_ASC
  facebookID_DESC
  googleID_ASC
  googleID_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  gender: Gender!
  permissions: [Permission!]!
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationUpdateManyWithoutBuyerInput
}

input UserUpdateInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationUpdateManyWithoutBuyerInput
}

input UserUpdateManyMutationInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  gender: Gender
  permissions: UserUpdatepermissionsInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutAdsInput {
  create: UserCreateWithoutAdsInput
  update: UserUpdateWithoutAdsDataInput
  upsert: UserUpsertWithoutAdsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutCarsInput {
  create: UserCreateWithoutCarsInput
  update: UserUpdateWithoutCarsDataInput
  upsert: UserUpsertWithoutCarsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutConversationsInput {
  create: UserCreateWithoutConversationsInput
  update: UserUpdateWithoutConversationsDataInput
  upsert: UserUpsertWithoutConversationsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutOffersInput {
  create: UserCreateWithoutOffersInput
  update: UserUpdateWithoutOffersDataInput
  upsert: UserUpsertWithoutOffersInput
  connect: UserWhereUniqueInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdateWithoutAdsDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationUpdateManyWithoutBuyerInput
}

input UserUpdateWithoutCarsDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationUpdateManyWithoutBuyerInput
}

input UserUpdateWithoutConversationsDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
}

input UserUpdateWithoutOffersDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  birthDate: DateUpdateOneRequiredInput
  gender: Gender
  permissions: UserUpdatepermissionsInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
  facebookID: ID
  googleID: ID
  resetToken: String
  resetTokenExpiry: Float
  conversations: ConversationUpdateManyWithoutBuyerInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutAdsInput {
  update: UserUpdateWithoutAdsDataInput!
  create: UserCreateWithoutAdsInput!
}

input UserUpsertWithoutCarsInput {
  update: UserUpdateWithoutCarsDataInput!
  create: UserCreateWithoutCarsInput!
}

input UserUpsertWithoutConversationsInput {
  update: UserUpdateWithoutConversationsDataInput!
  create: UserCreateWithoutConversationsInput!
}

input UserUpsertWithoutOffersInput {
  update: UserUpdateWithoutOffersDataInput!
  create: UserCreateWithoutOffersInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  birthDate: DateWhereInput
  gender: Gender
  gender_not: Gender
  gender_in: [Gender!]
  gender_not_in: [Gender!]
  offers_every: OfferWhereInput
  offers_some: OfferWhereInput
  offers_none: OfferWhereInput
  ads_every: AdWhereInput
  ads_some: AdWhereInput
  ads_none: AdWhereInput
  cars_every: CarWhereInput
  cars_some: CarWhereInput
  cars_none: CarWhereInput
  facebookID: ID
  facebookID_not: ID
  facebookID_in: [ID!]
  facebookID_not_in: [ID!]
  facebookID_lt: ID
  facebookID_lte: ID
  facebookID_gt: ID
  facebookID_gte: ID
  facebookID_contains: ID
  facebookID_not_contains: ID
  facebookID_starts_with: ID
  facebookID_not_starts_with: ID
  facebookID_ends_with: ID
  facebookID_not_ends_with: ID
  googleID: ID
  googleID_not: ID
  googleID_in: [ID!]
  googleID_not_in: [ID!]
  googleID_lt: ID
  googleID_lte: ID
  googleID_gt: ID
  googleID_gte: ID
  googleID_contains: ID
  googleID_not_contains: ID
  googleID_starts_with: ID
  googleID_not_starts_with: ID
  googleID_ends_with: ID
  googleID_not_ends_with: ID
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: Float
  resetTokenExpiry_not: Float
  resetTokenExpiry_in: [Float!]
  resetTokenExpiry_not_in: [Float!]
  resetTokenExpiry_lt: Float
  resetTokenExpiry_lte: Float
  resetTokenExpiry_gt: Float
  resetTokenExpiry_gte: Float
  conversations_every: ConversationWhereInput
  conversations_some: ConversationWhereInput
  conversations_none: ConversationWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  facebookID: ID
  googleID: ID
}
`