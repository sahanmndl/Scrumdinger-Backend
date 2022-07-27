import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/UserRoutes";

const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb", extended: true }))
app.use('/api/user', userRouter)

mongoose
  .connect(
    "mongodb+srv://admin:admin12345@cluster0.ddwtt.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(8000))
  .then(() =>
    console.log("connected")
  )
  .catch((err) => console.log(err));

//admin12345