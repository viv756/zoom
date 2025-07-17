import express from 'express'
import { createServer } from 'node:http'
import { Socket } from 'socket.io'
import mongoose from 'mongoose'

import cors from 'cors'

const app = express()
app.get("/", (req, res) => {
  return res.json({message:"Hello"})
})

app.listen(8000, () => {
  console.log("server is running");
  
})