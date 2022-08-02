import express from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/UserController.js";

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/:id', getUserById)

export default userRouter