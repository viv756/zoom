import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import cors from "cors";
import { error } from "node:console";
import { connetToSocket } from "./controller/socketManager.js";

const app = express();
const server = createServer(app);
const io = connetToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors())
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({limit:"40kb",extended:true}))

app.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

mongoose
  .connect(
    "mongodb+srv://vrvivekpc:vrvivekpc@zoomclone.2gh3bfa.mongodb.net/?retryWrites=true&w=majority&appName=zoomclone"
  )
  .then(() => {
    console.log("Mongo db is connected");
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(app.get("port"), () => {
  console.log("server is running");
});
