import { Router } from "express";
import { getPlaceById, getPlacesByCategory,fetchPlaces } from '../controllers/place.controller.js'



const router = Router();

router.route('/place/:id').get(getPlaceById)
router.route('/category/:category').get(getPlacesByCategory);
router.route('/collection').get(fetchPlaces)
export default router