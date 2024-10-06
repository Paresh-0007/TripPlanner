import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    place: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    conclusion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.statics.fetchBlogs = async function () {
    try {
      const blogs = await this.find({});
      return blogs; // Return the array of places
    } catch (err) {
      throw new ApiError(404, "Resource not Found!");
    }
  }

export const Blog = mongoose.model("Blog", blogSchema);
