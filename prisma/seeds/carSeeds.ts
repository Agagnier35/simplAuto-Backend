import {
  Prisma,
  Manufacturer,
  User,
  CarCategory,
  CarModel,
  CarFeature
} from "../../src/generated/prisma-client";

export const seedCars = async (prisma: Prisma) => {
  // Get all to make seeding multiple Ads easier
  const users: User[] = await prisma.users();
  const manufacturers: Manufacturer[] = await prisma.manufacturers();
  const carModels: CarModel[] = await prisma.carModels();
  const carCategories: CarCategory[] = await prisma.carCategories();

  const color: CarFeature[] = await prisma.carFeatures({
    where: { name: "black", category: { name: "color" } }
  });

  const motor: CarFeature[] = await prisma.carFeatures({
    where: { name: "2.0L", category: { name: "motor" } }
  });

  const fuelType: CarFeature[] = await prisma.carFeatures({
    where: { name: "gasoline", category: { name: "fuelType" } }
  });

  const doorNumber: CarFeature[] = await prisma.carFeatures({
    where: { name: "2", category: { name: "doorNumber" } }
  });

  const seatNumber: CarFeature[] = await prisma.carFeatures({
    where: { name: "2", category: { name: "seatNumber" } }
  });

  const drivetrain: CarFeature[] = await prisma.carFeatures({
    where: { name: "4x4", category: { name: "drivetrain" } }
  });

  const transmission: CarFeature[] = await prisma.carFeatures({
    where: { name: "manual", category: { name: "transmission" } }
  });

  const sunroof: CarFeature[] = await prisma.carFeatures({
    where: { name: "true", category: { name: "sunroof" } }
  });

  const cruiseControl: CarFeature[] = await prisma.carFeatures({
    where: { name: "true", category: { name: "cruiseControl" } }
  });

  const trailerHitch: CarFeature[] = await prisma.carFeatures({
    where: { name: "true", category: { name: "trailerHitch" } }
  });

  const airConditioning: CarFeature[] = await prisma.carFeatures({
    where: { name: "true", category: { name: "airConditioning" } }
  });

  const car1 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Jeep").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Wrangler").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "SUV").id }
    },
    year: 2018,
    mileage: 102000,
    status: "PUBLISHED",
    description:
      "Tucson, Arizona — Fraîchement débarqué au Salon de l’auto de Los Angeles au début du mois de décembre, le nouveau Jeep Wrangler 2018 fait déjà l’envie de tous les amateurs du légendaire 4x4 à travers le monde. Inutile de vous dire que l’excitation était à son comble lorsque les gens de FCA Canada nous ont invités au lancement officiel de la 8e génération de l’un des plus emblématiques véhicules à avoir foulé la planète Terre depuis les années 1940. Read more at https://www.auto123.com/fr/essais-routiers/jeep-wrangler-2018-premieres-impressions/64250/#EAe4v3B1tLfBXzHJ.99",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: fuelType[0].id },
        { id: doorNumber[0].id },
        { id: seatNumber[0].id },
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: sunroof[0].id },
        { id: cruiseControl[0].id },
        { id: trailerHitch[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/lnlewjvyvlacsms3cwgz.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/vmoilqyat9cnbqlnqwcd.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094811/CarImages/zyskzryxqtwpbjsrfukj.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094812/CarImages/jh8ebagegv7z0w40j1un.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/lnlewjvyvlacsms3cwgz.jpg"
      ]
    }
  });

  const car2 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Honda").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Civic").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Motorcycle - Scooter").id
      }
    },
    year: 2020,
    mileage: 5,
    status: "PUBLISHED",
    features: { connect: [{ id: motor[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1550946108/CarImages/mdqng4tzsn2tk1c3ncar.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1550946110/CarImages/opwr3g8gjxaq3lu8po9a.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1550946109/CarImages/noq1xat8t0qbqop9smum.jpg"
      ]
    }
  });
};
