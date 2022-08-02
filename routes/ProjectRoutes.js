import express from "express";
import { createProject, deleteProject, getProjectById, getProjects, getProjectsByUserId, updateProject } from "../controllers/ProjectController.js";

const projectRouter = express.Router()

projectRouter.get('/', getProjects)
projectRouter.post('/create', createProject)
projectRouter.put('/update/:id', updateProject)
projectRouter.delete('/:id', deleteProject)
projectRouter.get('/:id', getProjectById)
projectRouter.get('/user/:id', getProjectsByUserId)

export default projectRouter