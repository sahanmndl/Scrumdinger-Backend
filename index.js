import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/UserRoutes.js";
import projectRouter from "./routes/ProjectRoutes.js";
import dotenv from 'dotenv';

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(process.env.PORT || 8000))
  .then(() =>
    console.log("connected")
  )
  .catch((err) => console.log(err));