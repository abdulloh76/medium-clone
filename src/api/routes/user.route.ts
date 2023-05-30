import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/user", authMiddleware, getAllUsers);

export default userRouter;
