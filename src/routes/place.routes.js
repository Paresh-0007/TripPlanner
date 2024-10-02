import { Router } from "express";
import { getPlaceById } from '../controllers/place.controller.js'



const router = Router();


router.route('/:id').get(getPlaceById)

export default router