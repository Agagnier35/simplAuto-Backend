import {
  Prisma,
  Manufacturer,
  User,
  CarCategory,
  CarModel,
  CarFeature
} from "../../src/generated/prisma-client";

export const seedAds = async (prisma: Prisma) => {
  // Get all to make seeding multiple Ads easier
  const users: User[] = await prisma.users();
  const manufacturers: Manufacturer[] = await prisma.manufacturers();
  const carModels: CarModel[] = await prisma.carModels();
  const carCategories: CarCategory[] = await prisma.carCategories();

  const redColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "red", category: { name: "color" } }
  });
  const blueColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "blue", category: { name: "color" } }
  });
  const goldColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "gold", category: { name: "color" } }
  });
  const yellowColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "yellow", category: { name: "color" } }
  });
  const orangeColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "orange", category: { name: "color" } }
  });
  const greyColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "grey", category: { name: "color" } }
  });
  const fiveDoors: CarFeature[] = await prisma.carFeatures({
    where: { name: "5", category: { name: "doorNumber" } }
  });
  const twoDoors: CarFeature[] = await prisma.carFeatures({
    where: { name: "5", category: { name: "doorNumber" } }
  });
  const threeSeats: CarFeature[] = await prisma.carFeatures({
    where: { name: "3", category: { name: "seatNumber" } }
  });
  const isCruise: CarFeature[] = await prisma.carFeatures({
    where: { name: "true", category: { name: "cruiseControl" } }
  });
  const manualTransmission: CarFeature[] = await prisma.carFeatures({
    where: { name: "manual", category: { name: "transmission" } }
  });

  const ad1 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    priceLowerBound: 50,
    priceHigherBound: 5000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Volkswagen").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Jetta").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 20000,
    yearLowerBound: 2016,
    yearHigherBound: 2018,
    features: { connect: [{ id: redColor[0].id }] }
  });

  const ad2 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    priceLowerBound: 5000,
    priceHigherBound: 10000,
    category: { connect: { id: carCategories.find(c => c.name === "SUV").id } },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Honda").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Civic").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 100000,
    yearLowerBound: 1800,
    yearHigherBound: 2020,
    features: {
      connect: [
        { id: blueColor[0].id },
        { id: isCruise[0].id },
        { id: manualTransmission[0].id }
      ]
    }
  });

  // RIP ad3 shrug

  const ad4 = await prisma.createAd({
    creator: {
      connect: {
        id: users.find(u => u.email === "alexandre_clark@yopmail.com").id
      }
    },
    priceLowerBound: 10000,
    priceHigherBound: 30000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 20000,
    features: { connect: [{ id: redColor[0].id }] }
  });

  const ad5 = await prisma.createAd({
    creator: {
      connect: {
        id: users.find(u => u.email === "bellepro@yopmail.com").id
      }
    },
    priceLowerBound: 10000,
    priceHigherBound: 30000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    yearLowerBound: 2016,
    yearHigherBound: 2020,
    features: { connect: [{ id: redColor[0].id }] }
  });

  const ad6 = await prisma.createAd({
    creator: {
      connect: {
        id: users.find(u => u.email === "lol@yopmail.com").id
      }
    },
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 20000,
    yearLowerBound: 2016,
    yearHigherBound: 2020,
    features: { connect: [{ id: redColor[0].id }] }
  });

  const ad7 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 12000,
    priceHigherBound: 26000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Coupe").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Audi").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Q8").id } },
    mileageLowerBound: 20000,
    mileageHigherBound: 120000,
    yearLowerBound: 1980,
    yearHigherBound: 2020,
    features: {
      connect: [
        { id: greyColor[0].id },
        { id: twoDoors[0].id },
        { id: isCruise[0].id }
      ]
    }
  });

  const ad8 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 20000,
    priceHigherBound: 36000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Cadillac").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "XT5").id } },
    mileageLowerBound: 10000,
    mileageHigherBound: 80000,
    yearLowerBound: 2000,
    yearHigherBound: 2020,
    features: {
      connect: [
        { id: blueColor[0].id },
        { id: fiveDoors[0].id },
        { id: isCruise[0].id },
        { id: manualTransmission[0].id }
      ]
    }
  });

  const ad9 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 3000,
    priceHigherBound: 8000,
    category: { connect: { id: carCategories.find(c => c.name === "Bus").id } },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Dodge").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Aries").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 125000,
    yearLowerBound: 1925,
    yearHigherBound: 2020,
    features: {
      connect: [{ id: yellowColor[0].id }, { id: manualTransmission[0].id }]
    }
  });

  const ad10 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 8000,
    priceHigherBound: 15000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Wagon").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "GMC").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Vandura").id } },
    mileageLowerBound: 30000,
    mileageHigherBound: 100000,
    yearLowerBound: 2001,
    yearHigherBound: 2019,
    features: { connect: [{ id: goldColor[0].id }] }
  });

  const ad11 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 1000,
    priceHigherBound: 6000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Pickup").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Oldsmobile").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Bravada").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 70000,
    yearLowerBound: 1800,
    yearHigherBound: 2015,
    features: {
      connect: [
        { id: orangeColor[0].id },
        { id: twoDoors[0].id },
        { id: threeSeats[0].id }
      ]
    }
  });

  const ad12 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "marcat@yopmail.com").id }
    },
    priceLowerBound: 50000,
    priceHigherBound: 100000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 89000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  const ad13 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 50000,
    priceHigherBound: 99000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 89000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  const ad14 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 60000,
    priceHigherBound: 90000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 95000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  // --- ACCEPTED ADS ---
  const ad15 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 12000,
    priceHigherBound: 26000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Coupe").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Audi").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Q8").id } },
    mileageLowerBound: 20000,
    mileageHigherBound: 120000,
    yearLowerBound: 1980,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [
        { id: greyColor[0].id },
        { id: twoDoors[0].id },
        { id: isCruise[0].id }
      ]
    }
  });

  const ad16 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 20000,
    priceHigherBound: 36000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Cadillac").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "XT5").id } },
    mileageLowerBound: 10000,
    mileageHigherBound: 80000,
    yearLowerBound: 2000,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [
        { id: blueColor[0].id },
        { id: fiveDoors[0].id },
        { id: isCruise[0].id },
        { id: manualTransmission[0].id }
      ]
    }
  });

  const ad17 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 3000,
    priceHigherBound: 8000,
    category: { connect: { id: carCategories.find(c => c.name === "Bus").id } },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Dodge").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Aries").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 125000,
    yearLowerBound: 1925,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [{ id: yellowColor[0].id }, { id: manualTransmission[0].id }]
    }
  });

  const ad18 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 8000,
    priceHigherBound: 15000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Wagon").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "GMC").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Vandura").id } },
    mileageLowerBound: 30000,
    mileageHigherBound: 100000,
    yearLowerBound: 2001,
    yearHigherBound: 2019,
    status: "ACCEPTED",
    features: { connect: [{ id: goldColor[0].id }] }
  });

  const ad19 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 1000,
    priceHigherBound: 6000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Pickup").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Oldsmobile").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Bravada").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 70000,
    yearLowerBound: 1800,
    yearHigherBound: 2015,
    status: "ACCEPTED",
    features: {
      connect: [
        { id: orangeColor[0].id },
        { id: twoDoors[0].id },
        { id: threeSeats[0].id }
      ]
    }
  });

  const ad20 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "marcat@yopmail.com").id }
    },
    priceLowerBound: 50000,
    priceHigherBound: 100000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 89000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  const ad21 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "lol@yopmail.com").id }
    },
    priceLowerBound: 50000,
    priceHigherBound: 99000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 89000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  const ad22 = await prisma.createAd({
    creator: {
      connect: { id: users.find(u => u.email === "bellepro@yopmail.com").id }
    },
    priceLowerBound: 60000,
    priceHigherBound: 90000,
    category: {
      connect: { id: carCategories.find(c => c.name === "Convertible").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    mileageLowerBound: 50000,
    mileageHigherBound: 95000,
    yearLowerBound: 1900,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: {
      connect: [
        {
          id: redColor[0].id
        }
      ]
    }
  });

  const ad23 = await prisma.createAd({
    creator: {
      connect: {
        id: users.find(u => u.email === "lol@yopmail.com").id
      }
    },
    category: {
      connect: { id: carCategories.find(c => c.name === "Sedan").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    mileageLowerBound: 0,
    mileageHigherBound: 20000,
    yearLowerBound: 2016,
    yearHigherBound: 2020,
    status: "ACCEPTED",
    features: { connect: [{ id: redColor[0].id }] }
  });
};
