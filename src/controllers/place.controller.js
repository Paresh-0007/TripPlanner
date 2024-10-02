import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Place } from "../models/place.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const getPlaceById = async function (req,res) {
    const { id } = req.params;

    try {
        const place = await Place.findById(id)
        if(!place){
            throw new ApiError(404, "Place not Found !");
        }

        return res
        .status(200)
        .json(new ApiResponse(200,place,`${place.name} data attached in the Response !`))

    } catch (error) {
        console.log("Ooops ! Something went Wrong while fetching the place data check place controller for more info",error);
        res.status(500)
    }
}

export { getPlaceById }