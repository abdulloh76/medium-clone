import { createServer } from "http";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const bootstrap = () => {
  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
  });
};

bootstrap();
