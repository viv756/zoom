import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";
import { connetToSocket } from "./controller/socketManager.js";
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const server = createServer(app);
const io = connetToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo db is connected");
  })
  .catch((error) => {
    console.log(error);
  });


  app.use("/api/v1/users", userRoutes);

server.listen(app.get("port"), () => {
  console.log("server is running");
});

