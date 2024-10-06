import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const fetchBlogs = async (req, res) => {
    try {
      const blogs = await Blog.fetchBlogs();
      return res.status(200).json(blogs);
    } catch (error) {
      console.log("Error fetching blogs:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

const getBlogById = async(req,res)=>{
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id)
        //console.log(blog)
        if(!blog){
            throw new ApiError(404, "Place not Found !");
        }

        return res
        .status(200)
        .json(new ApiResponse(200,blog,`${blog.title} data attached in the Response !`))

    } catch (error) {
        console.log("Ooops ! Something went Wrong while fetching the blog data check blog controller for more info",error);
        res.status(500)
    }
}
export {fetchBlogs, getBlogById}