import { Router } from "express";
import { getAllPosts, getPostById } from "../controllers/post.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const postRouter = Router();

postRouter.get("/post", authMiddleware, getAllPosts);
postRouter.get("/post/:id", authMiddleware, getPostById);

export default postRouter;
