import {
  Prisma,
  User,
  Offer,
  OfferAddon,
  Ad,
  Car
} from "../../src/generated/prisma-client";
import { createLexer } from "graphql/language";
import { user } from "../../src/resolvers/Mutations/user";

export const seedOffers = async (prisma: Prisma) => {
  // Get all to make seeding multiple offers easier
  const users: User[] = await prisma.users();
  const addons: OfferAddon[] = await prisma.offerAddons();

  // -------Offer1-------
  const ad1: Ad[] = await prisma.ads({
    where: { creator: { email: "dominic@yopmail.com" } }
  });
  const car1: Car[] = await prisma.cars({
    where: { owner: { email: "king@yopmail.com" } }
  });

  const offer1: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    ad: { connect: { id: ad1[0].id } },
    car: { connect: { id: car1[0].id } },
    price: 10000,
    status: "PUBLISHED",
    addons: { connect: [{ id: addons.find(a => a.name === "tires").id }] }
  });

  // -------Offer2-------
  const ad2: Ad[] = await prisma.ads({
    where: { creator: { email: "king@yopmail.com" } }
  });
  const car2: Car[] = await prisma.cars({
    where: { owner: { email: "dominic@yopmail.com" } }
  });
  const offer2: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    ad: { connect: { id: ad2[0].id } },
    car: { connect: { id: car2[0].id } },
    price: 10000,
    status: "PUBLISHED",
    addons: { connect: [{ id: addons.find(a => a.name === "mags").id }] }
  });

  // -------Offer3---------
  const ad3: Ad[] = await prisma.ads({
    where: {
      creator: { email: "marcat@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      }
    }
  });
  const car3: Car[] = await prisma.cars({
    where: {
      owner: { email: "king@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      },
      year: 1988
    }
  });
  const offer3: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    ad: { connect: { id: ad3[0].id } },
    car: { connect: { id: car3[0].id } },
    price: 66000,
    status: "PUBLISHED",
    addons: { connect: [{ id: addons.find(a => a.name === "mags").id }] }
  });

  // -------Offer4---------
  const ad4: Ad[] = await prisma.ads({
    where: {
      creator: { email: "lol@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      }
    }
  });
  const car4: Car[] = await prisma.cars({
    where: {
      owner: { email: "king@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      },
      year: 1990
    }
  });
  const offer4: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    ad: { connect: { id: ad4[0].id } },
    car: { connect: { id: car4[0].id } },
    price: 67000,
    status: "PUBLISHED"
  });

  // -------Offer5---------
  const ad5: Ad[] = await prisma.ads({
    where: {
      creator: { email: "bellepro@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      }
    }
  });
  const car5: Car[] = await prisma.cars({
    where: {
      owner: { email: "king@yopmail.com" },
      manufacturer: {
        name: "Ferrari"
      },
      model: {
        name: "Testarossa"
      },
      year: 1995
    }
  });
  const offer5: Offer = await prisma.createOffer({
    creator: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    ad: { connect: { id: ad5[0].id } },
    car: { connect: { id: car5[0].id } },
    price: 68000,
    status: "PUBLISHED"
  });

  // --------Offers 100% Subaru Impreza---------
  const subarusImprezaAds: Ad[] = await prisma.ads({
    where: {
      manufacturer: { name: "Subaru" },
      model: { name: "Impreza" }
    }
  });
  const [car]: Car[] = await prisma.cars({
    where: {
      owner: { email: "king@yopmail.com" },
      manufacturer: { name: "Subaru" },
      model: { name: "Impreza" }
    }
  });

  let price = 10000;
  for (const ad of subarusImprezaAds) {
    const offer: Offer = await prisma.createOffer({
      price,
      creator: {
        connect: { id: users.find(u => u.email === "king@yopmail.com").id }
      },
      ad: { connect: { id: ad.id } },
      car: { connect: { id: car.id } },
      status: "PUBLISHED"
    });
    price += 100;
  }

  // ---- ACCEPTED OFFERS -----
  const acceptedAds = await prisma.ads({ where: { status: "ACCEPTED" } });
  const acceptedCar = await prisma.cars({ where: { status: "SOLD" } });

  for (let i = 0; i < acceptedCar.length; i += 1) {
    const car = acceptedCar[i];
    const ad = acceptedAds[i];

    await prisma.createOffer({
      ad: { connect: { id: ad.id } },
      car: { connect: { id: car.id } },
      status: "ACCEPTED",
      price: Math.random() * (100000 - 5000) + 5000,
      creator: {
        connect: { id: users.find(u => u.email === "king@yopmail.com").id }
      }
    });
  }
};
