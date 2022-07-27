import express from "express";
import { getAllUsers, login, register } from "../controllers/UserController";

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/register', register)
userRouter.post('/login', login)

export default userRouter