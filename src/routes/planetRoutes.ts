import express from "express";
import {
  getPlanets,
  addPlanet,
  getPlanetById,
  updatePlanet,
  deletePlanet,
} from "../controllers/planetController";

const router = express.Router();

router.get("/planets", getPlanets);
router.get("/planets/:id", getPlanetById);
router.post("/planets", addPlanet);
router.put("/planets/:id", updatePlanet);
router.delete("/planets/:id", deletePlanet);

export default router;
