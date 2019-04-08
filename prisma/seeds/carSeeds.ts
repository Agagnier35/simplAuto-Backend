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

  const redColor: CarFeature[] = await prisma.carFeatures({
    where: { name: "red", category: { name: "color" } }
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

  const car3 = await prisma.createCar({
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
    year: 2015,
    mileage: 20000,
    status: "PUBLISHED",
    description:
      "Tucson, Arizona — Fraîchement débarqué au Salon de l’auto de Los Angeles au début du mois de décembre",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: fuelType[0].id },
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
        "https://res.cloudinary.com/simplauto/image/upload/v1553094812/CarImages/jh8ebagegv7z0w40j1un.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094811/CarImages/zyskzryxqtwpbjsrfukj.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/lnlewjvyvlacsms3cwgz.jpg"
      ]
    }
  });

  const car4 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Convertible").id
      }
    },
    year: 1995,
    mileage: 90000,
    status: "PUBLISHED",
    features: {
      connect: [
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: redColor[0].id },
        { id: cruiseControl[0].id },
        { id: trailerHitch[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144129/CarImages/iqb5w7je6oaibwj6xlev.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/atbjddg2lmd5qpanx4ml.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/rboqbhafzye9qczvngo3.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144129/CarImages/iqb5w7je6oaibwj6xlev.jpg"
      ]
    }
  });

  const car5 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Convertible").id
      }
    },
    year: 1990,
    mileage: 80000,
    status: "PUBLISHED",
    features: {
      connect: [
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: redColor[0].id },
        { id: cruiseControl[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/rboqbhafzye9qczvngo3.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/atbjddg2lmd5qpanx4ml.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144129/CarImages/iqb5w7je6oaibwj6xlev.jpg"
      ]
    }
  });

  const car6 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Convertible").id
      }
    },
    year: 1988,
    mileage: 80500,
    status: "PUBLISHED",
    features: {
      connect: [
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: redColor[0].id },
        { id: cruiseControl[0].id },
        { id: trailerHitch[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/atbjddg2lmd5qpanx4ml.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/rboqbhafzye9qczvngo3.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144129/CarImages/iqb5w7je6oaibwj6xlev.jpg"
      ]
    }
  });

  const car7 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Sedan").id
      }
    },
    year: 2019,
    mileage: 20000,
    status: "PUBLISHED",
    features: { connect: [{ id: redColor[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/trim_09.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/18535387876x640.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/280px-2007-2009_Subaru_Impreza_sedan_--_03-22-2010.jpg"
      ]
    }
  });

  const car8 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Aston Martin").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Rapide S").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Liftback").id }
    },
    year: 1978,
    mileage: 666666,
    status: "PUBLISHED",
    description: "Beautiful Aston Martin with sunroof",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: doorNumber[0].id },
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: sunroof[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/aston.jpg"
      ]
    }
  });

  const car9 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Tesla").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Model 3").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Minivan").id }
    },
    year: 2020,
    mileage: 1234,
    status: "PUBLISHED",
    description: "1337 Tesla Car. Must Buy !",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: fuelType[0].id },
        { id: doorNumber[0].id },
        { id: seatNumber[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/tesla.jpg"
      ]
    }
  });

  const car10 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Outback").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Minivan").id }
    },
    year: 2023,
    mileage: 654321,
    status: "PUBLISHED",
    description:
      "Le JPEG File Interchange Format, abrégé JFIF, est une norme pour faciliter l'échange de fichiers contenant des images enregistrées avec la compression JPEG.",
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/subaru.jpeg"
      ]
    }
  });

  const car11 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Volvo").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "XC90").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Incomplete").id }
    },
    year: 2028,
    mileage: 1010410,
    status: "PUBLISHED",
    description: "VROOM VROOM !",
    features: {
      connect: [{ id: airConditioning[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/volvo.jpg"
      ]
    }
  });

  const car12 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "MINI").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Cooper").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Bus").id }
    },
    year: 2001,
    mileage: 100001,
    status: "PUBLISHED",
    description: "This car will be your soulmate",
    features: {
      connect: [{ id: drivetrain[0].id }, { id: transmission[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/mini.jpeg"
      ]
    }
  });

  const car13 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Isuzu").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "NPR").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Wagon").id }
    },
    year: 1999,
    mileage: 90,
    status: "PUBLISHED",
    description: "Isuzu? More like is for u !",
    features: {
      connect: [{ id: airConditioning[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/isuzu.jpg"
      ]
    }
  });

  // --- SOLD CARS ---
  const car14 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Ferrari").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Testarossa").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Convertible").id
      }
    },
    year: 1988,
    mileage: 80500,
    status: "SOLD",
    features: {
      connect: [
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: redColor[0].id },
        { id: cruiseControl[0].id },
        { id: trailerHitch[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/atbjddg2lmd5qpanx4ml.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144128/CarImages/rboqbhafzye9qczvngo3.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144129/CarImages/iqb5w7je6oaibwj6xlev.jpg"
      ]
    }
  });

  const car15 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Sedan").id
      }
    },
    year: 2019,
    mileage: 20000,
    status: "SOLD",
    features: { connect: [{ id: redColor[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/trim_09.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/18535387876x640.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/280px-2007-2009_Subaru_Impreza_sedan_--_03-22-2010.jpg"
      ]
    }
  });

  const car16 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Aston Martin").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Rapide S").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Liftback").id }
    },
    year: 1978,
    mileage: 666666,
    status: "SOLD",
    description: "Beautiful Aston Martin with sunroof",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: doorNumber[0].id },
        { id: drivetrain[0].id },
        { id: transmission[0].id },
        { id: sunroof[0].id },
        { id: airConditioning[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/aston.jpg"
      ]
    }
  });

  const car17 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Tesla").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Model 3").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Minivan").id }
    },
    year: 2020,
    mileage: 1234,
    status: "SOLD",
    description: "1337 Tesla Car. Must Buy !",
    features: {
      connect: [
        { id: motor[0].id },
        { id: color[0].id },
        { id: fuelType[0].id },
        { id: doorNumber[0].id },
        { id: seatNumber[0].id }
      ]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/tesla.jpg"
      ]
    }
  });

  const car18 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Outback").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Minivan").id }
    },
    year: 2023,
    mileage: 654321,
    status: "SOLD",
    description:
      "Le JPEG File Interchange Format, abrégé JFIF, est une norme pour faciliter l'échange de fichiers contenant des images enregistrées avec la compression JPEG.",
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/subaru.jpeg"
      ]
    }
  });

  const car19 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Volvo").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "XC90").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Incomplete").id }
    },
    year: 2028,
    mileage: 1010410,
    status: "SOLD",
    description: "VROOM VROOM !",
    features: {
      connect: [{ id: airConditioning[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/volvo.jpg"
      ]
    }
  });

  const car20 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "MINI").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Cooper").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Bus").id }
    },
    year: 2001,
    mileage: 100001,
    status: "SOLD",
    description: "This car will be your soulmate",
    features: {
      connect: [{ id: drivetrain[0].id }, { id: transmission[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/mini.jpeg"
      ]
    }
  });

  const car21 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "dominic@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Isuzu").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "NPR").id } },
    category: {
      connect: { id: carCategories.find(c => c.name === "Wagon").id }
    },
    year: 1999,
    mileage: 90,
    status: "PUBLISHED",
    description: "Isuzu? More like is for u !",
    features: {
      connect: [{ id: airConditioning[0].id }]
    },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1553094813/CarImages/isuzu.jpg"
      ]
    }
  });

  const car22 = await prisma.createCar({
    owner: {
      connect: { id: users.find(u => u.email === "king@yopmail.com").id }
    },
    manufacturer: {
      connect: { id: manufacturers.find(m => m.name === "Subaru").id }
    },
    model: { connect: { id: carModels.find(c => c.name === "Impreza").id } },
    category: {
      connect: {
        id: carCategories.find(c => c.name === "Sedan").id
      }
    },
    year: 2019,
    mileage: 20000,
    status: "SOLD",
    features: { connect: [{ id: redColor[0].id }] },
    photos: {
      set: [
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/trim_09.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/18535387876x640.jpg",
        "https://res.cloudinary.com/simplauto/image/upload/v1554144111/CarImages/280px-2007-2009_Subaru_Impreza_sedan_--_03-22-2010.jpg"
      ]
    }
  });
};
