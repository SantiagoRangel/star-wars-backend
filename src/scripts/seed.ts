// seed.ts

import { PrismaClient } from "@prisma/client";
import { Planet } from "../models/Planet";

const prisma = new PrismaClient();

async function seed(planetData: Planet[]) {
  try {
    for (const planet of planetData) {
      const residentArray: string[] = [];
      for (const residentUrl of planet.residents) {
        if (residentUrl) {
          const response = await fetchData(residentUrl);
          residentArray.push(response.name);
        }
      }
      planet.residents = residentArray;
    }
    await prisma.planet.createMany({
      data: planetData,
    });
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

async function fetchData(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getAllPlanets = async () => {
  let done = false;
  const planets = [];
  let url = `${process.env.SWAPI_URL}/planets/`;
  while (!done) {
    const response = await fetchData(url);
    planets.push(...response.results);
    if (response.next) {
      url = response.next;
    } else {
      done = true;
    }
  }
  return planets;
};

getAllPlanets().then((planets) => {
  seed(planets).then(() => {
    prisma.$disconnect();
  });
});
