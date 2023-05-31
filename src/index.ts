import { createServer } from "http";
import express from "express";
import authRouter from "./api/routes/auth.route";
import userRouter from "./api/routes/user.route";
import postRouter from "./api/routes/post.route";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const bootstrap = () => {
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
  });
};

bootstrap();
