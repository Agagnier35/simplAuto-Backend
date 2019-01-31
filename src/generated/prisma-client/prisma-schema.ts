export const typeDefs = /* GraphQL */ `type Ad {
  id: ID!
  creator: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
  features(where: AdFeatureWhereInput, orderBy: AdFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AdFeature!]
  priceLowerBound: Float!
  priceHigherBound: Float!
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
  features: AdFeatureCreateManyInput
  priceLowerBound: Float!
  priceHigherBound: Float!
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
  features: AdFeatureCreateManyInput
  priceLowerBound: Float!
  priceHigherBound: Float!
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdCreateWithoutOffersInput {
  creator: UserCreateOneWithoutAdsInput!
  features: AdFeatureCreateManyInput
  priceLowerBound: Float!
  priceHigherBound: Float!
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

type AdEdge {
  node: Ad!
  cursor: String!
}

type AdFeature {
  id: ID!
  feature: CarFeature!
  importance: AdFeatureImportance!
}

type AdFeatureConnection {
  pageInfo: PageInfo!
  edges: [AdFeatureEdge]!
  aggregate: AggregateAdFeature!
}

input AdFeatureCreateInput {
  feature: CarFeatureCreateOneInput!
  importance: AdFeatureImportance!
}

input AdFeatureCreateManyInput {
  create: [AdFeatureCreateInput!]
  connect: [AdFeatureWhereUniqueInput!]
}

type AdFeatureEdge {
  node: AdFeature!
  cursor: String!
}

enum AdFeatureImportance {
  LOW
  MEDIUM
  HIGH
}

enum AdFeatureOrderByInput {
  id_ASC
  id_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AdFeaturePreviousValues {
  id: ID!
  importance: AdFeatureImportance!
}

input AdFeatureScalarWhereInput {
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
  importance: AdFeatureImportance
  importance_not: AdFeatureImportance
  importance_in: [AdFeatureImportance!]
  importance_not_in: [AdFeatureImportance!]
  AND: [AdFeatureScalarWhereInput!]
  OR: [AdFeatureScalarWhereInput!]
  NOT: [AdFeatureScalarWhereInput!]
}

type AdFeatureSubscriptionPayload {
  mutation: MutationType!
  node: AdFeature
  updatedFields: [String!]
  previousValues: AdFeaturePreviousValues
}

input AdFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AdFeatureWhereInput
  AND: [AdFeatureSubscriptionWhereInput!]
  OR: [AdFeatureSubscriptionWhereInput!]
  NOT: [AdFeatureSubscriptionWhereInput!]
}

input AdFeatureUpdateDataInput {
  feature: CarFeatureUpdateOneRequiredInput
  importance: AdFeatureImportance
}

input AdFeatureUpdateInput {
  feature: CarFeatureUpdateOneRequiredInput
  importance: AdFeatureImportance
}

input AdFeatureUpdateManyDataInput {
  importance: AdFeatureImportance
}

input AdFeatureUpdateManyInput {
  create: [AdFeatureCreateInput!]
  update: [AdFeatureUpdateWithWhereUniqueNestedInput!]
  upsert: [AdFeatureUpsertWithWhereUniqueNestedInput!]
  delete: [AdFeatureWhereUniqueInput!]
  connect: [AdFeatureWhereUniqueInput!]
  disconnect: [AdFeatureWhereUniqueInput!]
  deleteMany: [AdFeatureScalarWhereInput!]
  updateMany: [AdFeatureUpdateManyWithWhereNestedInput!]
}

input AdFeatureUpdateManyMutationInput {
  importance: AdFeatureImportance
}

input AdFeatureUpdateManyWithWhereNestedInput {
  where: AdFeatureScalarWhereInput!
  data: AdFeatureUpdateManyDataInput!
}

input AdFeatureUpdateWithWhereUniqueNestedInput {
  where: AdFeatureWhereUniqueInput!
  data: AdFeatureUpdateDataInput!
}

input AdFeatureUpsertWithWhereUniqueNestedInput {
  where: AdFeatureWhereUniqueInput!
  update: AdFeatureUpdateDataInput!
  create: AdFeatureCreateInput!
}

input AdFeatureWhereInput {
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
  feature: CarFeatureWhereInput
  importance: AdFeatureImportance
  importance_not: AdFeatureImportance
  importance_in: [AdFeatureImportance!]
  importance_not_in: [AdFeatureImportance!]
  AND: [AdFeatureWhereInput!]
  OR: [AdFeatureWhereInput!]
  NOT: [AdFeatureWhereInput!]
}

input AdFeatureWhereUniqueInput {
  id: ID
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
  priceLowerBound: Float!
  priceHigherBound: Float!
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
  features: AdFeatureUpdateManyInput
  priceLowerBound: Float
  priceHigherBound: Float
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyDataInput {
  priceLowerBound: Float
  priceHigherBound: Float
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyMutationInput {
  priceLowerBound: Float
  priceHigherBound: Float
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
  features: AdFeatureUpdateManyInput
  priceLowerBound: Float
  priceHigherBound: Float
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateWithoutOffersDataInput {
  creator: UserUpdateOneRequiredWithoutAdsInput
  features: AdFeatureUpdateManyInput
  priceLowerBound: Float
  priceHigherBound: Float
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
  features_every: AdFeatureWhereInput
  features_some: AdFeatureWhereInput
  features_none: AdFeatureWhereInput
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

type AggregateAdFeature {
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

type AggregateManufacturer {
  count: Int!
}

type AggregateOffer {
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
}

input CarCreateManyWithoutOwnerInput {
  create: [CarCreateWithoutOwnerInput!]
  connect: [CarWhereUniqueInput!]
}

input CarCreateOneInput {
  create: CarCreateInput
  connect: CarWhereUniqueInput
}

input CarCreatephotosInput {
  set: [String!]
}

input CarCreateWithoutOwnerInput {
  manufacturer: ManufacturerCreateOneInput!
  model: CarModelCreateOneInput!
  category: CarCategoryCreateOneInput!
  year: Int!
  mileage: Int!
  photos: CarCreatephotosInput
  features: CarFeatureCreateManyInput
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
  features(where: CarFeatureWhereInput, orderBy: CarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CarFeature!]
}

type CarFeatureCategoryConnection {
  pageInfo: PageInfo!
  edges: [CarFeatureCategoryEdge]!
  aggregate: AggregateCarFeatureCategory!
}

input CarFeatureCategoryCreateInput {
  name: String!
  features: CarFeatureCreateManyWithoutCategoryInput
}

input CarFeatureCategoryCreateOneWithoutFeaturesInput {
  create: CarFeatureCategoryCreateWithoutFeaturesInput
  connect: CarFeatureCategoryWhereUniqueInput
}

input CarFeatureCategoryCreateWithoutFeaturesInput {
  name: String!
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
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarFeatureCategoryPreviousValues {
  id: ID!
  name: String!
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
  features: CarFeatureUpdateManyWithoutCategoryInput
}

input CarFeatureCategoryUpdateManyMutationInput {
  name: String
}

input CarFeatureCategoryUpdateOneRequiredWithoutFeaturesInput {
  create: CarFeatureCategoryCreateWithoutFeaturesInput
  update: CarFeatureCategoryUpdateWithoutFeaturesDataInput
  upsert: CarFeatureCategoryUpsertWithoutFeaturesInput
  connect: CarFeatureCategoryWhereUniqueInput
}

input CarFeatureCategoryUpdateWithoutFeaturesDataInput {
  name: String
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
  features_every: CarFeatureWhereInput
  features_some: CarFeatureWhereInput
  features_none: CarFeatureWhereInput
  AND: [CarFeatureCategoryWhereInput!]
  OR: [CarFeatureCategoryWhereInput!]
  NOT: [CarFeatureCategoryWhereInput!]
}

input CarFeatureCategoryWhereUniqueInput {
  id: ID
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

input CarFeatureCreateOneInput {
  create: CarFeatureCreateInput
  connect: CarFeatureWhereUniqueInput
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

input CarFeatureUpdateOneRequiredInput {
  create: CarFeatureCreateInput
  update: CarFeatureUpdateDataInput
  upsert: CarFeatureUpsertNestedInput
  connect: CarFeatureWhereUniqueInput
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

input CarFeatureUpsertNestedInput {
  update: CarFeatureUpdateDataInput!
  create: CarFeatureCreateInput!
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
  AND: [CarScalarWhereInput!]
  OR: [CarScalarWhereInput!]
  NOT: [CarScalarWhereInput!]
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

input CarUpdateDataInput {
  owner: UserUpdateOneRequiredWithoutCarsInput
  manufacturer: ManufacturerUpdateOneRequiredInput
  model: CarModelUpdateOneRequiredInput
  category: CarCategoryUpdateOneRequiredInput
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  features: CarFeatureUpdateManyInput
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
}

input CarUpdateManyDataInput {
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
}

input CarUpdateManyMutationInput {
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
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

input CarUpdateOneRequiredInput {
  create: CarCreateInput
  update: CarUpdateDataInput
  upsert: CarUpsertNestedInput
  connect: CarWhereUniqueInput
}

input CarUpdatephotosInput {
  set: [String!]
}

input CarUpdateWithoutOwnerDataInput {
  manufacturer: ManufacturerUpdateOneRequiredInput
  model: CarModelUpdateOneRequiredInput
  category: CarCategoryUpdateOneRequiredInput
  year: Int
  mileage: Int
  photos: CarUpdatephotosInput
  features: CarFeatureUpdateManyInput
}

input CarUpdateWithWhereUniqueWithoutOwnerInput {
  where: CarWhereUniqueInput!
  data: CarUpdateWithoutOwnerDataInput!
}

input CarUpsertNestedInput {
  update: CarUpdateDataInput!
  create: CarCreateInput!
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
  AND: [CarWhereInput!]
  OR: [CarWhereInput!]
  NOT: [CarWhereInput!]
}

input CarWhereUniqueInput {
  id: ID
}

scalar DateTime

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

type Mutation {
  createAd(data: AdCreateInput!): Ad!
  updateAd(data: AdUpdateInput!, where: AdWhereUniqueInput!): Ad
  updateManyAds(data: AdUpdateManyMutationInput!, where: AdWhereInput): BatchPayload!
  upsertAd(where: AdWhereUniqueInput!, create: AdCreateInput!, update: AdUpdateInput!): Ad!
  deleteAd(where: AdWhereUniqueInput!): Ad
  deleteManyAds(where: AdWhereInput): BatchPayload!
  createAdFeature(data: AdFeatureCreateInput!): AdFeature!
  updateAdFeature(data: AdFeatureUpdateInput!, where: AdFeatureWhereUniqueInput!): AdFeature
  updateManyAdFeatures(data: AdFeatureUpdateManyMutationInput!, where: AdFeatureWhereInput): BatchPayload!
  upsertAdFeature(where: AdFeatureWhereUniqueInput!, create: AdFeatureCreateInput!, update: AdFeatureUpdateInput!): AdFeature!
  deleteAdFeature(where: AdFeatureWhereUniqueInput!): AdFeature
  deleteManyAdFeatures(where: AdFeatureWhereInput): BatchPayload!
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
  createManufacturer(data: ManufacturerCreateInput!): Manufacturer!
  updateManufacturer(data: ManufacturerUpdateInput!, where: ManufacturerWhereUniqueInput!): Manufacturer
  updateManyManufacturers(data: ManufacturerUpdateManyMutationInput!, where: ManufacturerWhereInput): BatchPayload!
  upsertManufacturer(where: ManufacturerWhereUniqueInput!, create: ManufacturerCreateInput!, update: ManufacturerUpdateInput!): Manufacturer!
  deleteManufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  deleteManyManufacturers(where: ManufacturerWhereInput): BatchPayload!
  createOffer(data: OfferCreateInput!): Offer!
  updateOffer(data: OfferUpdateInput!, where: OfferWhereUniqueInput!): Offer
  updateManyOffers(data: OfferUpdateManyMutationInput!, where: OfferWhereInput): BatchPayload!
  upsertOffer(where: OfferWhereUniqueInput!, create: OfferCreateInput!, update: OfferUpdateInput!): Offer!
  deleteOffer(where: OfferWhereUniqueInput!): Offer
  deleteManyOffers(where: OfferWhereInput): BatchPayload!
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
}

type OfferConnection {
  pageInfo: PageInfo!
  edges: [OfferEdge]!
  aggregate: AggregateOffer!
}

input OfferCreateInput {
  creator: UserCreateOneWithoutOffersInput!
  ad: AdCreateOneWithoutOffersInput!
  car: CarCreateOneInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
}

input OfferCreateManyWithoutAdInput {
  create: [OfferCreateWithoutAdInput!]
  connect: [OfferWhereUniqueInput!]
}

input OfferCreateManyWithoutCreatorInput {
  create: [OfferCreateWithoutCreatorInput!]
  connect: [OfferWhereUniqueInput!]
}

input OfferCreateWithoutAdInput {
  creator: UserCreateOneWithoutOffersInput!
  car: CarCreateOneInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
}

input OfferCreateWithoutCreatorInput {
  ad: AdCreateOneWithoutOffersInput!
  car: CarCreateOneInput!
  price: Float!
  status: OfferStatus
  finalRank: Int
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
  car: CarUpdateOneRequiredInput
  price: Float
  status: OfferStatus
  finalRank: Int
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

input OfferUpdateWithoutAdDataInput {
  creator: UserUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredInput
  price: Float
  status: OfferStatus
  finalRank: Int
}

input OfferUpdateWithoutCreatorDataInput {
  ad: AdUpdateOneRequiredWithoutOffersInput
  car: CarUpdateOneRequiredInput
  price: Float
  status: OfferStatus
  finalRank: Int
}

input OfferUpdateWithWhereUniqueWithoutAdInput {
  where: OfferWhereUniqueInput!
  data: OfferUpdateWithoutAdDataInput!
}

input OfferUpdateWithWhereUniqueWithoutCreatorInput {
  where: OfferWhereUniqueInput!
  data: OfferUpdateWithoutCreatorDataInput!
}

input OfferUpsertWithWhereUniqueWithoutAdInput {
  where: OfferWhereUniqueInput!
  update: OfferUpdateWithoutAdDataInput!
  create: OfferCreateWithoutAdInput!
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
  adFeature(where: AdFeatureWhereUniqueInput!): AdFeature
  adFeatures(where: AdFeatureWhereInput, orderBy: AdFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AdFeature]!
  adFeaturesConnection(where: AdFeatureWhereInput, orderBy: AdFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AdFeatureConnection!
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
  manufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  manufacturers(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Manufacturer]!
  manufacturersConnection(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ManufacturerConnection!
  offer(where: OfferWhereUniqueInput!): Offer
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer]!
  offersConnection(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OfferConnection!
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
  adFeature(where: AdFeatureSubscriptionWhereInput): AdFeatureSubscriptionPayload
  car(where: CarSubscriptionWhereInput): CarSubscriptionPayload
  carCategory(where: CarCategorySubscriptionWhereInput): CarCategorySubscriptionPayload
  carFeature(where: CarFeatureSubscriptionWhereInput): CarFeatureSubscriptionPayload
  carFeatureCategory(where: CarFeatureCategorySubscriptionWhereInput): CarFeatureCategorySubscriptionPayload
  carModel(where: CarModelSubscriptionWhereInput): CarModelSubscriptionPayload
  manufacturer(where: ManufacturerSubscriptionWhereInput): ManufacturerSubscriptionPayload
  offer(where: OfferSubscriptionWhereInput): OfferSubscriptionPayload
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
  age: Int!
  gender: Gender!
  permissions: [Permission!]!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
  ads(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ad!]
  cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car!]
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
  age: Int!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  ads: AdCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
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
  age: Int!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
}

input UserCreateWithoutCarsInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  age: Int!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  ads: AdCreateManyWithoutCreatorInput
}

input UserCreateWithoutOffersInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  location: String!
  age: Int!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  ads: AdCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
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
  age_ASC
  age_DESC
  gender_ASC
  gender_DESC
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
  age: Int!
  gender: Gender!
  permissions: [Permission!]!
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
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
}

input UserUpdateInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
}

input UserUpdateManyMutationInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
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
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
}

input UserUpdateWithoutCarsDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
  offers: OfferUpdateManyWithoutCreatorInput
  ads: AdUpdateManyWithoutCreatorInput
}

input UserUpdateWithoutOffersDataInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  age: Int
  gender: Gender
  permissions: UserUpdatepermissionsInput
  ads: AdUpdateManyWithoutCreatorInput
  cars: CarUpdateManyWithoutOwnerInput
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
  age: Int
  age_not: Int
  age_in: [Int!]
  age_not_in: [Int!]
  age_lt: Int
  age_lte: Int
  age_gt: Int
  age_gte: Int
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
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`