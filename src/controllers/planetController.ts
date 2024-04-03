import { Request, Response, response } from "express";
import { Planet } from "@/src/models/Planet";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
const prisma = new PrismaClient();

export const getPlanets = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const name = req.query.name as string;
  const diameter = req.query.diameter as string;
  const climate = req.query.climate as string;
  const terrain = req.query.terrain as string;
  const population = req.query.population as string;

  const sortBy: "name" | "diameter" | "climate" | "terrain" | "population" = req
    .query.sort as "name" | "diameter" | "climate" | "terrain" | "population";

  type Sort = { [key: string]: string };
  const sortObject: Sort = {};

  sortBy && (sortObject[sortBy] = "asc");
  const startIndex = (page - 1) * pageSize;
  const count = await prisma.planet.count({
    where: {
      name: {
        contains: name as string,
      },
      diameter: {
        contains: diameter as string,
      },
      climate: {
        contains: climate as string,
      },
      terrain: {
        contains: terrain as string,
      },
      population: {
        contains: population as string,
      },
    },
  });

  try {
    const planets = await prisma.planet.findMany({
      skip: startIndex,
      take: pageSize,
      where: {
        name: {
          contains: name as string,
        },
        diameter: {
          contains: diameter as string,
        },
        climate: {
          contains: climate as string,
        },
        terrain: {
          contains: terrain as string,
        },
        population: {
          contains: population as string,
        },
      },
      orderBy: sortObject,
    });

    const response = {
      count: count,
      currentPage: page,
      hasMore: startIndex + pageSize < count,
      planets: planets,
    };
    res.json(response).status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
    throw error;
  }
};

export const getPlanetById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const planet = await prisma.planet.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!planet) {
      res.status(404).json({ error: "Planet not found" });
      return;
    }
    res.json(planet).status(200);
  } catch {
    console.log(error);
    res.status(400).json({ error: error });
    throw error;
  }
};

export const deletePlanet = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const planet = await prisma.planet.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!planet) {
      res.status(404).json({ error: "Planet not found" });
      return;
    }
    res.json(planet).status(200);
  } catch {
    console.log(error);
    res.status(400).json({ error: error });
    throw error;
  }
};

export const addPlanet = async (req: Request, res: Response) => {
  try {
    const { name, diameter, climate, terrain, population, residents } =
      req.body;

    if (!name || !diameter || !climate || !terrain || !population) {
      res.status(400).json({ error: "Fields are required" });
      throw new Error("Fields are required");
    }

    if (
      typeof name !== "string" ||
      typeof diameter !== "string" ||
      typeof climate !== "string" ||
      typeof terrain !== "string" ||
      typeof population !== "string" ||
      typeof residents !== "string"
    ) {
      res.status(400).json({ error: "Invalid data types" });
      throw new Error("Invalid data types");
    }

    const newPlanet = {
      name,
      diameter,
      climate,
      terrain,
      population,
      residents: residents.split(", "),
    };
    const response = await prisma.planet.create({
      data: newPlanet,
    });

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const updatePlanet = async (req: Request, res: Response) => {
  try {
    const { name, diameter, climate, terrain, population, residents } =
      req.body;
    const id = req.params.id;

    if (
      (name && typeof name !== "string") ||
      (diameter && typeof diameter !== "string") ||
      (climate && typeof climate !== "string") ||
      (terrain && typeof terrain !== "string") ||
      (population && typeof population !== "string") ||
      (residents && typeof residents !== "string")
    ) {
      res.status(400).json("Invalid data types");
      throw new Error("Invalid data types");
    }

    const updatedPlanet = {
      name,
      diameter,
      climate,
      terrain,
      population,
      residents: residents.split(", "),
    };
    const response = await prisma.planet.update({
      where: {
        id: parseInt(id),
      },
      data: updatedPlanet,
    });

    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
