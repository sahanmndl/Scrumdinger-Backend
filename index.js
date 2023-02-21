import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import projectRouter from "./routes/ProjectRoutes.js";
import dotenv from 'dotenv';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)

mongoose
  .connect(
    "mongodb+srv://scrumdinger:scrumdinger15937@cluster0.o3e7k.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(process.env.PORT || 8000))
  .then(() =>
    console.log("connected")
  )
  .catch((err) => console.log(err));