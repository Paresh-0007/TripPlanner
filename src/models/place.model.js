import mongoose from "mongoose";
import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    best_time_to_visit: {
      type: String,
      required: true,
    },
    minimum_budget: {
      type: String,
      required: true,
    },
    place_type: {
      type: String, //the value must be comma seperated so that the place can be searched by category wised using regexof mongodb
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
    region: {
      type: String,
      required: true,
    },
    is_hidden: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
        required: true,
      }
    ],
    transportation_modes: {
      train: {
        type: String,
        required: true,
      },
      car: {
        type: String,
        required: true,
      },
      bus: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

//Feteches complete collection.
placeSchema.statics.fetchPlaces = async function () {
  try {
    const places = await this.find({});
    return places; // Return the array of places
  } catch (err) {
    throw new ApiError(404, "Resource not Found!");
  }
}

// Create and export the model
export const Place = mongoose.model("Place", placeSchema);