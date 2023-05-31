import { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
} from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const postRouter = Router();

postRouter.post("/", authMiddleware, createPost);
postRouter.get("/", authMiddleware, getAllPosts);
postRouter.get("/:id", authMiddleware, getPostById);

export default postRouter;
