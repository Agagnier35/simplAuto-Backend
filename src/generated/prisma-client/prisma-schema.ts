export const typeDefs = /* GraphQL */ `type Ad {
  id: ID!
  creator: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer!]
  priceLowerBoundFeature: PriceBoundFeature
  priceHigherBoundFeature: PriceBoundFeature
  manufacturerFeature: ManufacturerFeature
  modelFeature: ModelFeature
  categoryFeature: CategoryFeature
  mileageLowerBoundFeature: MileageBoundFeature
  mileageHigherBoundFeature: MileageBoundFeature
  yearLowerBoundFeature: YearBoundFeature
  yearHigherBoundFeature: YearBoundFeature
  features(where: AdCarFeatureWhereInput, orderBy: AdCarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AdCarFeature!]
  isUrgent: Boolean!
  isFirst: Boolean!
  status: AdStatus!
}

type AdCarFeature {
  id: ID!
  feature: CarFeature!
  importance: AdCarFeatureImportance
}

type AdCarFeatureConnection {
  pageInfo: PageInfo!
  edges: [AdCarFeatureEdge]!
  aggregate: AggregateAdCarFeature!
}

input AdCarFeatureCreateInput {
  feature: CarFeatureCreateOneInput!
  importance: AdCarFeatureImportance
}

input AdCarFeatureCreateManyInput {
  create: [AdCarFeatureCreateInput!]
  connect: [AdCarFeatureWhereUniqueInput!]
}

type AdCarFeatureEdge {
  node: AdCarFeature!
  cursor: String!
}

enum AdCarFeatureImportance {
  LOW
  MEDIUM
  HIGH
}

enum AdCarFeatureOrderByInput {
  id_ASC
  id_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AdCarFeaturePreviousValues {
  id: ID!
  importance: AdCarFeatureImportance
}

input AdCarFeatureScalarWhereInput {
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
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [AdCarFeatureScalarWhereInput!]
  OR: [AdCarFeatureScalarWhereInput!]
  NOT: [AdCarFeatureScalarWhereInput!]
}

type AdCarFeatureSubscriptionPayload {
  mutation: MutationType!
  node: AdCarFeature
  updatedFields: [String!]
  previousValues: AdCarFeaturePreviousValues
}

input AdCarFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AdCarFeatureWhereInput
  AND: [AdCarFeatureSubscriptionWhereInput!]
  OR: [AdCarFeatureSubscriptionWhereInput!]
  NOT: [AdCarFeatureSubscriptionWhereInput!]
}

input AdCarFeatureUpdateDataInput {
  feature: CarFeatureUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input AdCarFeatureUpdateInput {
  feature: CarFeatureUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input AdCarFeatureUpdateManyDataInput {
  importance: AdCarFeatureImportance
}

input AdCarFeatureUpdateManyInput {
  create: [AdCarFeatureCreateInput!]
  update: [AdCarFeatureUpdateWithWhereUniqueNestedInput!]
  upsert: [AdCarFeatureUpsertWithWhereUniqueNestedInput!]
  delete: [AdCarFeatureWhereUniqueInput!]
  connect: [AdCarFeatureWhereUniqueInput!]
  disconnect: [AdCarFeatureWhereUniqueInput!]
  deleteMany: [AdCarFeatureScalarWhereInput!]
  updateMany: [AdCarFeatureUpdateManyWithWhereNestedInput!]
}

input AdCarFeatureUpdateManyMutationInput {
  importance: AdCarFeatureImportance
}

input AdCarFeatureUpdateManyWithWhereNestedInput {
  where: AdCarFeatureScalarWhereInput!
  data: AdCarFeatureUpdateManyDataInput!
}

input AdCarFeatureUpdateWithWhereUniqueNestedInput {
  where: AdCarFeatureWhereUniqueInput!
  data: AdCarFeatureUpdateDataInput!
}

input AdCarFeatureUpsertWithWhereUniqueNestedInput {
  where: AdCarFeatureWhereUniqueInput!
  update: AdCarFeatureUpdateDataInput!
  create: AdCarFeatureCreateInput!
}

input AdCarFeatureWhereInput {
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
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [AdCarFeatureWhereInput!]
  OR: [AdCarFeatureWhereInput!]
  NOT: [AdCarFeatureWhereInput!]
}

input AdCarFeatureWhereUniqueInput {
  id: ID
}

type AdConnection {
  pageInfo: PageInfo!
  edges: [AdEdge]!
  aggregate: AggregateAd!
}

input AdCreateInput {
  creator: UserCreateOneWithoutAdsInput!
  offers: OfferCreateManyWithoutAdInput
  priceLowerBoundFeature: PriceBoundFeatureCreateOneInput
  priceHigherBoundFeature: PriceBoundFeatureCreateOneInput
  manufacturerFeature: ManufacturerFeatureCreateOneInput
  modelFeature: ModelFeatureCreateOneInput
  categoryFeature: CategoryFeatureCreateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureCreateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureCreateOneInput
  yearLowerBoundFeature: YearBoundFeatureCreateOneInput
  yearHigherBoundFeature: YearBoundFeatureCreateOneInput
  features: AdCarFeatureCreateManyInput
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
  priceLowerBoundFeature: PriceBoundFeatureCreateOneInput
  priceHigherBoundFeature: PriceBoundFeatureCreateOneInput
  manufacturerFeature: ManufacturerFeatureCreateOneInput
  modelFeature: ModelFeatureCreateOneInput
  categoryFeature: CategoryFeatureCreateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureCreateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureCreateOneInput
  yearLowerBoundFeature: YearBoundFeatureCreateOneInput
  yearHigherBoundFeature: YearBoundFeatureCreateOneInput
  features: AdCarFeatureCreateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdCreateWithoutOffersInput {
  creator: UserCreateOneWithoutAdsInput!
  priceLowerBoundFeature: PriceBoundFeatureCreateOneInput
  priceHigherBoundFeature: PriceBoundFeatureCreateOneInput
  manufacturerFeature: ManufacturerFeatureCreateOneInput
  modelFeature: ModelFeatureCreateOneInput
  categoryFeature: CategoryFeatureCreateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureCreateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureCreateOneInput
  yearLowerBoundFeature: YearBoundFeatureCreateOneInput
  yearHigherBoundFeature: YearBoundFeatureCreateOneInput
  features: AdCarFeatureCreateManyInput
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
  priceLowerBoundFeature: PriceBoundFeatureUpdateOneInput
  priceHigherBoundFeature: PriceBoundFeatureUpdateOneInput
  manufacturerFeature: ManufacturerFeatureUpdateOneInput
  modelFeature: ModelFeatureUpdateOneInput
  categoryFeature: CategoryFeatureUpdateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureUpdateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureUpdateOneInput
  yearLowerBoundFeature: YearBoundFeatureUpdateOneInput
  yearHigherBoundFeature: YearBoundFeatureUpdateOneInput
  features: AdCarFeatureUpdateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyDataInput {
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateManyMutationInput {
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
  priceLowerBoundFeature: PriceBoundFeatureUpdateOneInput
  priceHigherBoundFeature: PriceBoundFeatureUpdateOneInput
  manufacturerFeature: ManufacturerFeatureUpdateOneInput
  modelFeature: ModelFeatureUpdateOneInput
  categoryFeature: CategoryFeatureUpdateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureUpdateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureUpdateOneInput
  yearLowerBoundFeature: YearBoundFeatureUpdateOneInput
  yearHigherBoundFeature: YearBoundFeatureUpdateOneInput
  features: AdCarFeatureUpdateManyInput
  isUrgent: Boolean
  isFirst: Boolean
  status: AdStatus
}

input AdUpdateWithoutOffersDataInput {
  creator: UserUpdateOneRequiredWithoutAdsInput
  priceLowerBoundFeature: PriceBoundFeatureUpdateOneInput
  priceHigherBoundFeature: PriceBoundFeatureUpdateOneInput
  manufacturerFeature: ManufacturerFeatureUpdateOneInput
  modelFeature: ModelFeatureUpdateOneInput
  categoryFeature: CategoryFeatureUpdateOneInput
  mileageLowerBoundFeature: MileageBoundFeatureUpdateOneInput
  mileageHigherBoundFeature: MileageBoundFeatureUpdateOneInput
  yearLowerBoundFeature: YearBoundFeatureUpdateOneInput
  yearHigherBoundFeature: YearBoundFeatureUpdateOneInput
  features: AdCarFeatureUpdateManyInput
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
  priceLowerBoundFeature: PriceBoundFeatureWhereInput
  priceHigherBoundFeature: PriceBoundFeatureWhereInput
  manufacturerFeature: ManufacturerFeatureWhereInput
  modelFeature: ModelFeatureWhereInput
  categoryFeature: CategoryFeatureWhereInput
  mileageLowerBoundFeature: MileageBoundFeatureWhereInput
  mileageHigherBoundFeature: MileageBoundFeatureWhereInput
  yearLowerBoundFeature: YearBoundFeatureWhereInput
  yearHigherBoundFeature: YearBoundFeatureWhereInput
  features_every: AdCarFeatureWhereInput
  features_some: AdCarFeatureWhereInput
  features_none: AdCarFeatureWhereInput
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

type AggregateAdCarFeature {
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

type AggregateCategoryFeature {
  count: Int!
}

type AggregateDate {
  count: Int!
}

type AggregateManufacturer {
  count: Int!
}

type AggregateManufacturerFeature {
  count: Int!
}

type AggregateMileageBoundFeature {
  count: Int!
}

type AggregateModelFeature {
  count: Int!
}

type AggregateOffer {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregatePriceBoundFeature {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateYearBoundFeature {
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

type CategoryFeature {
  id: ID!
  category: CarCategory!
  importance: AdCarFeatureImportance
}

type CategoryFeatureConnection {
  pageInfo: PageInfo!
  edges: [CategoryFeatureEdge]!
  aggregate: AggregateCategoryFeature!
}

input CategoryFeatureCreateInput {
  category: CarCategoryCreateOneInput!
  importance: AdCarFeatureImportance
}

input CategoryFeatureCreateOneInput {
  create: CategoryFeatureCreateInput
  connect: CategoryFeatureWhereUniqueInput
}

type CategoryFeatureEdge {
  node: CategoryFeature!
  cursor: String!
}

enum CategoryFeatureOrderByInput {
  id_ASC
  id_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CategoryFeaturePreviousValues {
  id: ID!
  importance: AdCarFeatureImportance
}

type CategoryFeatureSubscriptionPayload {
  mutation: MutationType!
  node: CategoryFeature
  updatedFields: [String!]
  previousValues: CategoryFeaturePreviousValues
}

input CategoryFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CategoryFeatureWhereInput
  AND: [CategoryFeatureSubscriptionWhereInput!]
  OR: [CategoryFeatureSubscriptionWhereInput!]
  NOT: [CategoryFeatureSubscriptionWhereInput!]
}

input CategoryFeatureUpdateDataInput {
  category: CarCategoryUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input CategoryFeatureUpdateInput {
  category: CarCategoryUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input CategoryFeatureUpdateManyMutationInput {
  importance: AdCarFeatureImportance
}

input CategoryFeatureUpdateOneInput {
  create: CategoryFeatureCreateInput
  update: CategoryFeatureUpdateDataInput
  upsert: CategoryFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CategoryFeatureWhereUniqueInput
}

input CategoryFeatureUpsertNestedInput {
  update: CategoryFeatureUpdateDataInput!
  create: CategoryFeatureCreateInput!
}

input CategoryFeatureWhereInput {
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
  category: CarCategoryWhereInput
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [CategoryFeatureWhereInput!]
  OR: [CategoryFeatureWhereInput!]
  NOT: [CategoryFeatureWhereInput!]
}

input CategoryFeatureWhereUniqueInput {
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

type ManufacturerFeature {
  id: ID!
  manufacturer: Manufacturer!
  importance: AdCarFeatureImportance
}

type ManufacturerFeatureConnection {
  pageInfo: PageInfo!
  edges: [ManufacturerFeatureEdge]!
  aggregate: AggregateManufacturerFeature!
}

input ManufacturerFeatureCreateInput {
  manufacturer: ManufacturerCreateOneInput!
  importance: AdCarFeatureImportance
}

input ManufacturerFeatureCreateOneInput {
  create: ManufacturerFeatureCreateInput
  connect: ManufacturerFeatureWhereUniqueInput
}

type ManufacturerFeatureEdge {
  node: ManufacturerFeature!
  cursor: String!
}

enum ManufacturerFeatureOrderByInput {
  id_ASC
  id_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ManufacturerFeaturePreviousValues {
  id: ID!
  importance: AdCarFeatureImportance
}

type ManufacturerFeatureSubscriptionPayload {
  mutation: MutationType!
  node: ManufacturerFeature
  updatedFields: [String!]
  previousValues: ManufacturerFeaturePreviousValues
}

input ManufacturerFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ManufacturerFeatureWhereInput
  AND: [ManufacturerFeatureSubscriptionWhereInput!]
  OR: [ManufacturerFeatureSubscriptionWhereInput!]
  NOT: [ManufacturerFeatureSubscriptionWhereInput!]
}

input ManufacturerFeatureUpdateDataInput {
  manufacturer: ManufacturerUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input ManufacturerFeatureUpdateInput {
  manufacturer: ManufacturerUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input ManufacturerFeatureUpdateManyMutationInput {
  importance: AdCarFeatureImportance
}

input ManufacturerFeatureUpdateOneInput {
  create: ManufacturerFeatureCreateInput
  update: ManufacturerFeatureUpdateDataInput
  upsert: ManufacturerFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ManufacturerFeatureWhereUniqueInput
}

input ManufacturerFeatureUpsertNestedInput {
  update: ManufacturerFeatureUpdateDataInput!
  create: ManufacturerFeatureCreateInput!
}

input ManufacturerFeatureWhereInput {
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
  manufacturer: ManufacturerWhereInput
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [ManufacturerFeatureWhereInput!]
  OR: [ManufacturerFeatureWhereInput!]
  NOT: [ManufacturerFeatureWhereInput!]
}

input ManufacturerFeatureWhereUniqueInput {
  id: ID
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

type MileageBoundFeature {
  id: ID!
  mileage: Int!
  importance: AdCarFeatureImportance
}

type MileageBoundFeatureConnection {
  pageInfo: PageInfo!
  edges: [MileageBoundFeatureEdge]!
  aggregate: AggregateMileageBoundFeature!
}

input MileageBoundFeatureCreateInput {
  mileage: Int!
  importance: AdCarFeatureImportance
}

input MileageBoundFeatureCreateOneInput {
  create: MileageBoundFeatureCreateInput
  connect: MileageBoundFeatureWhereUniqueInput
}

type MileageBoundFeatureEdge {
  node: MileageBoundFeature!
  cursor: String!
}

enum MileageBoundFeatureOrderByInput {
  id_ASC
  id_DESC
  mileage_ASC
  mileage_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MileageBoundFeaturePreviousValues {
  id: ID!
  mileage: Int!
  importance: AdCarFeatureImportance
}

type MileageBoundFeatureSubscriptionPayload {
  mutation: MutationType!
  node: MileageBoundFeature
  updatedFields: [String!]
  previousValues: MileageBoundFeaturePreviousValues
}

input MileageBoundFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MileageBoundFeatureWhereInput
  AND: [MileageBoundFeatureSubscriptionWhereInput!]
  OR: [MileageBoundFeatureSubscriptionWhereInput!]
  NOT: [MileageBoundFeatureSubscriptionWhereInput!]
}

input MileageBoundFeatureUpdateDataInput {
  mileage: Int
  importance: AdCarFeatureImportance
}

input MileageBoundFeatureUpdateInput {
  mileage: Int
  importance: AdCarFeatureImportance
}

input MileageBoundFeatureUpdateManyMutationInput {
  mileage: Int
  importance: AdCarFeatureImportance
}

input MileageBoundFeatureUpdateOneInput {
  create: MileageBoundFeatureCreateInput
  update: MileageBoundFeatureUpdateDataInput
  upsert: MileageBoundFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: MileageBoundFeatureWhereUniqueInput
}

input MileageBoundFeatureUpsertNestedInput {
  update: MileageBoundFeatureUpdateDataInput!
  create: MileageBoundFeatureCreateInput!
}

input MileageBoundFeatureWhereInput {
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
  mileage: Int
  mileage_not: Int
  mileage_in: [Int!]
  mileage_not_in: [Int!]
  mileage_lt: Int
  mileage_lte: Int
  mileage_gt: Int
  mileage_gte: Int
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [MileageBoundFeatureWhereInput!]
  OR: [MileageBoundFeatureWhereInput!]
  NOT: [MileageBoundFeatureWhereInput!]
}

input MileageBoundFeatureWhereUniqueInput {
  id: ID
}

type ModelFeature {
  id: ID!
  model: CarModel!
  importance: AdCarFeatureImportance
}

type ModelFeatureConnection {
  pageInfo: PageInfo!
  edges: [ModelFeatureEdge]!
  aggregate: AggregateModelFeature!
}

input ModelFeatureCreateInput {
  model: CarModelCreateOneInput!
  importance: AdCarFeatureImportance
}

input ModelFeatureCreateOneInput {
  create: ModelFeatureCreateInput
  connect: ModelFeatureWhereUniqueInput
}

type ModelFeatureEdge {
  node: ModelFeature!
  cursor: String!
}

enum ModelFeatureOrderByInput {
  id_ASC
  id_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ModelFeaturePreviousValues {
  id: ID!
  importance: AdCarFeatureImportance
}

type ModelFeatureSubscriptionPayload {
  mutation: MutationType!
  node: ModelFeature
  updatedFields: [String!]
  previousValues: ModelFeaturePreviousValues
}

input ModelFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ModelFeatureWhereInput
  AND: [ModelFeatureSubscriptionWhereInput!]
  OR: [ModelFeatureSubscriptionWhereInput!]
  NOT: [ModelFeatureSubscriptionWhereInput!]
}

input ModelFeatureUpdateDataInput {
  model: CarModelUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input ModelFeatureUpdateInput {
  model: CarModelUpdateOneRequiredInput
  importance: AdCarFeatureImportance
}

input ModelFeatureUpdateManyMutationInput {
  importance: AdCarFeatureImportance
}

input ModelFeatureUpdateOneInput {
  create: ModelFeatureCreateInput
  update: ModelFeatureUpdateDataInput
  upsert: ModelFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: ModelFeatureWhereUniqueInput
}

input ModelFeatureUpsertNestedInput {
  update: ModelFeatureUpdateDataInput!
  create: ModelFeatureCreateInput!
}

input ModelFeatureWhereInput {
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
  model: CarModelWhereInput
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [ModelFeatureWhereInput!]
  OR: [ModelFeatureWhereInput!]
  NOT: [ModelFeatureWhereInput!]
}

input ModelFeatureWhereUniqueInput {
  id: ID
}

type Mutation {
  createAd(data: AdCreateInput!): Ad!
  updateAd(data: AdUpdateInput!, where: AdWhereUniqueInput!): Ad
  updateManyAds(data: AdUpdateManyMutationInput!, where: AdWhereInput): BatchPayload!
  upsertAd(where: AdWhereUniqueInput!, create: AdCreateInput!, update: AdUpdateInput!): Ad!
  deleteAd(where: AdWhereUniqueInput!): Ad
  deleteManyAds(where: AdWhereInput): BatchPayload!
  createAdCarFeature(data: AdCarFeatureCreateInput!): AdCarFeature!
  updateAdCarFeature(data: AdCarFeatureUpdateInput!, where: AdCarFeatureWhereUniqueInput!): AdCarFeature
  updateManyAdCarFeatures(data: AdCarFeatureUpdateManyMutationInput!, where: AdCarFeatureWhereInput): BatchPayload!
  upsertAdCarFeature(where: AdCarFeatureWhereUniqueInput!, create: AdCarFeatureCreateInput!, update: AdCarFeatureUpdateInput!): AdCarFeature!
  deleteAdCarFeature(where: AdCarFeatureWhereUniqueInput!): AdCarFeature
  deleteManyAdCarFeatures(where: AdCarFeatureWhereInput): BatchPayload!
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
  createCategoryFeature(data: CategoryFeatureCreateInput!): CategoryFeature!
  updateCategoryFeature(data: CategoryFeatureUpdateInput!, where: CategoryFeatureWhereUniqueInput!): CategoryFeature
  updateManyCategoryFeatures(data: CategoryFeatureUpdateManyMutationInput!, where: CategoryFeatureWhereInput): BatchPayload!
  upsertCategoryFeature(where: CategoryFeatureWhereUniqueInput!, create: CategoryFeatureCreateInput!, update: CategoryFeatureUpdateInput!): CategoryFeature!
  deleteCategoryFeature(where: CategoryFeatureWhereUniqueInput!): CategoryFeature
  deleteManyCategoryFeatures(where: CategoryFeatureWhereInput): BatchPayload!
  createDate(data: DateCreateInput!): Date!
  updateManyDates(data: DateUpdateManyMutationInput!, where: DateWhereInput): BatchPayload!
  deleteManyDates(where: DateWhereInput): BatchPayload!
  createManufacturer(data: ManufacturerCreateInput!): Manufacturer!
  updateManufacturer(data: ManufacturerUpdateInput!, where: ManufacturerWhereUniqueInput!): Manufacturer
  updateManyManufacturers(data: ManufacturerUpdateManyMutationInput!, where: ManufacturerWhereInput): BatchPayload!
  upsertManufacturer(where: ManufacturerWhereUniqueInput!, create: ManufacturerCreateInput!, update: ManufacturerUpdateInput!): Manufacturer!
  deleteManufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  deleteManyManufacturers(where: ManufacturerWhereInput): BatchPayload!
  createManufacturerFeature(data: ManufacturerFeatureCreateInput!): ManufacturerFeature!
  updateManufacturerFeature(data: ManufacturerFeatureUpdateInput!, where: ManufacturerFeatureWhereUniqueInput!): ManufacturerFeature
  updateManyManufacturerFeatures(data: ManufacturerFeatureUpdateManyMutationInput!, where: ManufacturerFeatureWhereInput): BatchPayload!
  upsertManufacturerFeature(where: ManufacturerFeatureWhereUniqueInput!, create: ManufacturerFeatureCreateInput!, update: ManufacturerFeatureUpdateInput!): ManufacturerFeature!
  deleteManufacturerFeature(where: ManufacturerFeatureWhereUniqueInput!): ManufacturerFeature
  deleteManyManufacturerFeatures(where: ManufacturerFeatureWhereInput): BatchPayload!
  createMileageBoundFeature(data: MileageBoundFeatureCreateInput!): MileageBoundFeature!
  updateMileageBoundFeature(data: MileageBoundFeatureUpdateInput!, where: MileageBoundFeatureWhereUniqueInput!): MileageBoundFeature
  updateManyMileageBoundFeatures(data: MileageBoundFeatureUpdateManyMutationInput!, where: MileageBoundFeatureWhereInput): BatchPayload!
  upsertMileageBoundFeature(where: MileageBoundFeatureWhereUniqueInput!, create: MileageBoundFeatureCreateInput!, update: MileageBoundFeatureUpdateInput!): MileageBoundFeature!
  deleteMileageBoundFeature(where: MileageBoundFeatureWhereUniqueInput!): MileageBoundFeature
  deleteManyMileageBoundFeatures(where: MileageBoundFeatureWhereInput): BatchPayload!
  createModelFeature(data: ModelFeatureCreateInput!): ModelFeature!
  updateModelFeature(data: ModelFeatureUpdateInput!, where: ModelFeatureWhereUniqueInput!): ModelFeature
  updateManyModelFeatures(data: ModelFeatureUpdateManyMutationInput!, where: ModelFeatureWhereInput): BatchPayload!
  upsertModelFeature(where: ModelFeatureWhereUniqueInput!, create: ModelFeatureCreateInput!, update: ModelFeatureUpdateInput!): ModelFeature!
  deleteModelFeature(where: ModelFeatureWhereUniqueInput!): ModelFeature
  deleteManyModelFeatures(where: ModelFeatureWhereInput): BatchPayload!
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
  createPriceBoundFeature(data: PriceBoundFeatureCreateInput!): PriceBoundFeature!
  updatePriceBoundFeature(data: PriceBoundFeatureUpdateInput!, where: PriceBoundFeatureWhereUniqueInput!): PriceBoundFeature
  updateManyPriceBoundFeatures(data: PriceBoundFeatureUpdateManyMutationInput!, where: PriceBoundFeatureWhereInput): BatchPayload!
  upsertPriceBoundFeature(where: PriceBoundFeatureWhereUniqueInput!, create: PriceBoundFeatureCreateInput!, update: PriceBoundFeatureUpdateInput!): PriceBoundFeature!
  deletePriceBoundFeature(where: PriceBoundFeatureWhereUniqueInput!): PriceBoundFeature
  deleteManyPriceBoundFeatures(where: PriceBoundFeatureWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createYearBoundFeature(data: YearBoundFeatureCreateInput!): YearBoundFeature!
  updateYearBoundFeature(data: YearBoundFeatureUpdateInput!, where: YearBoundFeatureWhereUniqueInput!): YearBoundFeature
  updateManyYearBoundFeatures(data: YearBoundFeatureUpdateManyMutationInput!, where: YearBoundFeatureWhereInput): BatchPayload!
  upsertYearBoundFeature(where: YearBoundFeatureWhereUniqueInput!, create: YearBoundFeatureCreateInput!, update: YearBoundFeatureUpdateInput!): YearBoundFeature!
  deleteYearBoundFeature(where: YearBoundFeatureWhereUniqueInput!): YearBoundFeature
  deleteManyYearBoundFeatures(where: YearBoundFeatureWhereInput): BatchPayload!
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

type PriceBoundFeature {
  id: ID!
  price: Float!
  importance: AdCarFeatureImportance
}

type PriceBoundFeatureConnection {
  pageInfo: PageInfo!
  edges: [PriceBoundFeatureEdge]!
  aggregate: AggregatePriceBoundFeature!
}

input PriceBoundFeatureCreateInput {
  price: Float!
  importance: AdCarFeatureImportance
}

input PriceBoundFeatureCreateOneInput {
  create: PriceBoundFeatureCreateInput
  connect: PriceBoundFeatureWhereUniqueInput
}

type PriceBoundFeatureEdge {
  node: PriceBoundFeature!
  cursor: String!
}

enum PriceBoundFeatureOrderByInput {
  id_ASC
  id_DESC
  price_ASC
  price_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PriceBoundFeaturePreviousValues {
  id: ID!
  price: Float!
  importance: AdCarFeatureImportance
}

type PriceBoundFeatureSubscriptionPayload {
  mutation: MutationType!
  node: PriceBoundFeature
  updatedFields: [String!]
  previousValues: PriceBoundFeaturePreviousValues
}

input PriceBoundFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PriceBoundFeatureWhereInput
  AND: [PriceBoundFeatureSubscriptionWhereInput!]
  OR: [PriceBoundFeatureSubscriptionWhereInput!]
  NOT: [PriceBoundFeatureSubscriptionWhereInput!]
}

input PriceBoundFeatureUpdateDataInput {
  price: Float
  importance: AdCarFeatureImportance
}

input PriceBoundFeatureUpdateInput {
  price: Float
  importance: AdCarFeatureImportance
}

input PriceBoundFeatureUpdateManyMutationInput {
  price: Float
  importance: AdCarFeatureImportance
}

input PriceBoundFeatureUpdateOneInput {
  create: PriceBoundFeatureCreateInput
  update: PriceBoundFeatureUpdateDataInput
  upsert: PriceBoundFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: PriceBoundFeatureWhereUniqueInput
}

input PriceBoundFeatureUpsertNestedInput {
  update: PriceBoundFeatureUpdateDataInput!
  create: PriceBoundFeatureCreateInput!
}

input PriceBoundFeatureWhereInput {
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
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [PriceBoundFeatureWhereInput!]
  OR: [PriceBoundFeatureWhereInput!]
  NOT: [PriceBoundFeatureWhereInput!]
}

input PriceBoundFeatureWhereUniqueInput {
  id: ID
}

type Query {
  ad(where: AdWhereUniqueInput!): Ad
  ads(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Ad]!
  adsConnection(where: AdWhereInput, orderBy: AdOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AdConnection!
  adCarFeature(where: AdCarFeatureWhereUniqueInput!): AdCarFeature
  adCarFeatures(where: AdCarFeatureWhereInput, orderBy: AdCarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AdCarFeature]!
  adCarFeaturesConnection(where: AdCarFeatureWhereInput, orderBy: AdCarFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AdCarFeatureConnection!
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
  categoryFeature(where: CategoryFeatureWhereUniqueInput!): CategoryFeature
  categoryFeatures(where: CategoryFeatureWhereInput, orderBy: CategoryFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CategoryFeature]!
  categoryFeaturesConnection(where: CategoryFeatureWhereInput, orderBy: CategoryFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CategoryFeatureConnection!
  dates(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Date]!
  datesConnection(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DateConnection!
  manufacturer(where: ManufacturerWhereUniqueInput!): Manufacturer
  manufacturers(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Manufacturer]!
  manufacturersConnection(where: ManufacturerWhereInput, orderBy: ManufacturerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ManufacturerConnection!
  manufacturerFeature(where: ManufacturerFeatureWhereUniqueInput!): ManufacturerFeature
  manufacturerFeatures(where: ManufacturerFeatureWhereInput, orderBy: ManufacturerFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ManufacturerFeature]!
  manufacturerFeaturesConnection(where: ManufacturerFeatureWhereInput, orderBy: ManufacturerFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ManufacturerFeatureConnection!
  mileageBoundFeature(where: MileageBoundFeatureWhereUniqueInput!): MileageBoundFeature
  mileageBoundFeatures(where: MileageBoundFeatureWhereInput, orderBy: MileageBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [MileageBoundFeature]!
  mileageBoundFeaturesConnection(where: MileageBoundFeatureWhereInput, orderBy: MileageBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MileageBoundFeatureConnection!
  modelFeature(where: ModelFeatureWhereUniqueInput!): ModelFeature
  modelFeatures(where: ModelFeatureWhereInput, orderBy: ModelFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ModelFeature]!
  modelFeaturesConnection(where: ModelFeatureWhereInput, orderBy: ModelFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ModelFeatureConnection!
  offer(where: OfferWhereUniqueInput!): Offer
  offers(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Offer]!
  offersConnection(where: OfferWhereInput, orderBy: OfferOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OfferConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  priceBoundFeature(where: PriceBoundFeatureWhereUniqueInput!): PriceBoundFeature
  priceBoundFeatures(where: PriceBoundFeatureWhereInput, orderBy: PriceBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PriceBoundFeature]!
  priceBoundFeaturesConnection(where: PriceBoundFeatureWhereInput, orderBy: PriceBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PriceBoundFeatureConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  yearBoundFeature(where: YearBoundFeatureWhereUniqueInput!): YearBoundFeature
  yearBoundFeatures(where: YearBoundFeatureWhereInput, orderBy: YearBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [YearBoundFeature]!
  yearBoundFeaturesConnection(where: YearBoundFeatureWhereInput, orderBy: YearBoundFeatureOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): YearBoundFeatureConnection!
  node(id: ID!): Node
}

type Subscription {
  ad(where: AdSubscriptionWhereInput): AdSubscriptionPayload
  adCarFeature(where: AdCarFeatureSubscriptionWhereInput): AdCarFeatureSubscriptionPayload
  car(where: CarSubscriptionWhereInput): CarSubscriptionPayload
  carCategory(where: CarCategorySubscriptionWhereInput): CarCategorySubscriptionPayload
  carFeature(where: CarFeatureSubscriptionWhereInput): CarFeatureSubscriptionPayload
  carFeatureCategory(where: CarFeatureCategorySubscriptionWhereInput): CarFeatureCategorySubscriptionPayload
  carModel(where: CarModelSubscriptionWhereInput): CarModelSubscriptionPayload
  categoryFeature(where: CategoryFeatureSubscriptionWhereInput): CategoryFeatureSubscriptionPayload
  date(where: DateSubscriptionWhereInput): DateSubscriptionPayload
  manufacturer(where: ManufacturerSubscriptionWhereInput): ManufacturerSubscriptionPayload
  manufacturerFeature(where: ManufacturerFeatureSubscriptionWhereInput): ManufacturerFeatureSubscriptionPayload
  mileageBoundFeature(where: MileageBoundFeatureSubscriptionWhereInput): MileageBoundFeatureSubscriptionPayload
  modelFeature(where: ModelFeatureSubscriptionWhereInput): ModelFeatureSubscriptionPayload
  offer(where: OfferSubscriptionWhereInput): OfferSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  priceBoundFeature(where: PriceBoundFeatureSubscriptionWhereInput): PriceBoundFeatureSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  yearBoundFeature(where: YearBoundFeatureSubscriptionWhereInput): YearBoundFeatureSubscriptionPayload
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
  resetToken: String
  resetTokenExpiry: Float
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
  resetToken: String
  resetTokenExpiry: Float
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
  birthDate: DateCreateOneInput!
  gender: Gender!
  permissions: UserCreatepermissionsInput
  offers: OfferCreateManyWithoutCreatorInput
  cars: CarCreateManyWithoutOwnerInput
  resetToken: String
  resetTokenExpiry: Float
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
  resetToken: String
  resetTokenExpiry: Float
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
  resetToken: String
  resetTokenExpiry: Float
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
  resetToken: String
  resetTokenExpiry: Float
}

input UserUpdateManyMutationInput {
  email: String
  firstName: String
  lastName: String
  password: String
  location: String
  gender: Gender
  permissions: UserUpdatepermissionsInput
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
  resetToken: String
  resetTokenExpiry: Float
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
  resetToken: String
  resetTokenExpiry: Float
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
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type YearBoundFeature {
  id: ID!
  year: Int!
  importance: AdCarFeatureImportance
}

type YearBoundFeatureConnection {
  pageInfo: PageInfo!
  edges: [YearBoundFeatureEdge]!
  aggregate: AggregateYearBoundFeature!
}

input YearBoundFeatureCreateInput {
  year: Int!
  importance: AdCarFeatureImportance
}

input YearBoundFeatureCreateOneInput {
  create: YearBoundFeatureCreateInput
  connect: YearBoundFeatureWhereUniqueInput
}

type YearBoundFeatureEdge {
  node: YearBoundFeature!
  cursor: String!
}

enum YearBoundFeatureOrderByInput {
  id_ASC
  id_DESC
  year_ASC
  year_DESC
  importance_ASC
  importance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type YearBoundFeaturePreviousValues {
  id: ID!
  year: Int!
  importance: AdCarFeatureImportance
}

type YearBoundFeatureSubscriptionPayload {
  mutation: MutationType!
  node: YearBoundFeature
  updatedFields: [String!]
  previousValues: YearBoundFeaturePreviousValues
}

input YearBoundFeatureSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: YearBoundFeatureWhereInput
  AND: [YearBoundFeatureSubscriptionWhereInput!]
  OR: [YearBoundFeatureSubscriptionWhereInput!]
  NOT: [YearBoundFeatureSubscriptionWhereInput!]
}

input YearBoundFeatureUpdateDataInput {
  year: Int
  importance: AdCarFeatureImportance
}

input YearBoundFeatureUpdateInput {
  year: Int
  importance: AdCarFeatureImportance
}

input YearBoundFeatureUpdateManyMutationInput {
  year: Int
  importance: AdCarFeatureImportance
}

input YearBoundFeatureUpdateOneInput {
  create: YearBoundFeatureCreateInput
  update: YearBoundFeatureUpdateDataInput
  upsert: YearBoundFeatureUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: YearBoundFeatureWhereUniqueInput
}

input YearBoundFeatureUpsertNestedInput {
  update: YearBoundFeatureUpdateDataInput!
  create: YearBoundFeatureCreateInput!
}

input YearBoundFeatureWhereInput {
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
  importance: AdCarFeatureImportance
  importance_not: AdCarFeatureImportance
  importance_in: [AdCarFeatureImportance!]
  importance_not_in: [AdCarFeatureImportance!]
  AND: [YearBoundFeatureWhereInput!]
  OR: [YearBoundFeatureWhereInput!]
  NOT: [YearBoundFeatureWhereInput!]
}

input YearBoundFeatureWhereUniqueInput {
  id: ID
}
`