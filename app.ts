import { createServer } from "http";
import express from "express";

const app = express();

app.use(express.json());

const bootstrap = () => {
  const server = createServer(app);

  server.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

bootstrap();
