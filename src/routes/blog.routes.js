import { Router } from "express";
import { fetchBlogs,getBlogById } from "../controllers/blog.controller.js";

const router = Router();

router.route('/collection').get(fetchBlogs)
router.route('/blog/:id').get(getBlogById)
export default router