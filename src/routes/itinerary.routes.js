import { Router } from "express";
import { fetchDataItinerary } from "../controllers/itinerary.controller.js";

const router = Router();

router.route('/itinerary').post(fetchDataItinerary)

export default router