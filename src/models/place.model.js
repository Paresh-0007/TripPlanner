import mongoose, { Schema } from "mongoose";

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
      type: String,
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
      default: true,
    },
    images: [
        {
            type: String,
            required:true
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

export const Place = mongoose.model("Place", placeSchema);
