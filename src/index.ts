import { createServer } from "http";
import express from "express";
import authRouter from "./api/routes/auth.route";
import userRouter from "./api/routes/user.route";
import postRouter from "./api/routes/post.route";
import { customErrorHandler } from "./api/utils/apiHelper";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use(customErrorHandler);

const bootstrap = () => {
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
  });
};

bootstrap();
