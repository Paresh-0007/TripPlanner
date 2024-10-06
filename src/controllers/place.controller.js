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

const getPlacesByCategory = async (req,res)=>{
    try {
        const { category } = req.params;
        const places = await Place.find({
          place_type: new RegExp(`\\b${category}\\b`, 'i')  // to use /,\,",' in js we have use specify \ before them in a string
                                                            // \b is use to bound the word that u want to search in the string              
        });
    
        if (places.length === 0) {
          return res.status(404).json({ message: "No places found for this category." });
        }
    
        res.json(places);
      } catch (error) {
        res.status(500).json({ message: "Error fetching places", error });
      }
}


const fetchPlaces = async (req, res) => {
  try {
    const places = await Place.fetchPlaces(); // Call static method
    // console.log(places);
    return res.status(200).json(places); // Send the places in the response
  } catch (error) {
    console.log("Error fetching places:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getPlaceBySearch = async (req, res) => {
  try {
      const { query } = req.query;  // Search query from the user

      // MongoDB search using regex and $or for searching across fields
      const places = await Place.find({
          $or: [
              { name: { $regex: query, $options: 'i' } },           // case-insensitive match on name
              { place_type: { $regex: query, $options: 'i' } },     // match on place_type
              { region: { $regex: query, $options: 'i' } }          // match on region
          ]
      });
      // console.log('Found Places:', places);
      res.json(places);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}

export { getPlaceById, getPlacesByCategory,fetchPlaces,getPlaceBySearch }