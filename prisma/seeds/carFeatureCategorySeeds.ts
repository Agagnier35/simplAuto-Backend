import { Prisma } from "../../src/generated/prisma-client";

export const seedCarFeaturesCategories = async (prisma: Prisma) => {
  const Motor = await prisma.createCarFeatureCategory({
    name: "motor",
    type: "MULTIPLE_CHOICE",
    features: { create: [{ name: "2.0L" }, { name: "2.5L" }] }
  });

  const Colors = await prisma.createCarFeatureCategory({
    name: "color",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [
        { name: "black" },
        { name: "blue" },
        { name: "brown" },
        { name: "gold" },
        { name: "green" },
        { name: "grey" },
        { name: "orange" },
        { name: "pink" },
        { name: "purple" },
        { name: "red" },
        { name: "silver" },
        { name: "tan" },
        { name: "teal" },
        { name: "white" },
        { name: "yellow" },
        { name: "other" }
      ]
    }
  });

  const FuelType = await prisma.createCarFeatureCategory({
    name: "fuelType",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [
        { name: "diesel" },
        { name: "electric" },
        { name: "gasoline" },
        { name: "hybrid" },
        { name: "other" }
      ]
    }
  });

  const DoorNumber = await prisma.createCarFeatureCategory({
    name: "doorNumber",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "other" }
      ]
    }
  });

  const SeatNumber = await prisma.createCarFeatureCategory({
    name: "seatNumber",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "other" }
      ]
    }
  });

  const Drivetrain = await prisma.createCarFeatureCategory({
    name: "drivetrain",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [
        { name: "4x4" },
        { name: "awd" },
        { name: "fwd" },
        { name: "rwd" },
        { name: "other" }
      ]
    }
  });

  const Transmission = await prisma.createCarFeatureCategory({
    name: "transmission",
    type: "MULTIPLE_CHOICE",
    features: {
      create: [{ name: "manual" }, { name: "automatic" }, { name: "other" }]
    }
  });

  const Sunroof = await prisma.createCarFeatureCategory({
    name: "sunroof",
    type: "TRUE_FALSE",
    features: { create: [{ name: "true" }, { name: "false" }] }
  });

  const CruiseControl = await prisma.createCarFeatureCategory({
    name: "cruiseControl",
    type: "TRUE_FALSE",
    features: { create: [{ name: "true" }, { name: "false" }] }
  });

  const TrailerHitch = await prisma.createCarFeatureCategory({
    name: "trailerHitch",
    type: "TRUE_FALSE",
    features: { create: [{ name: "true" }, { name: "false" }] }
  });

  const AirConditioning = await prisma.createCarFeatureCategory({
    name: "airConditioning",
    type: "TRUE_FALSE",
    features: { create: [{ name: "true" }, { name: "false" }] }
  });
};
