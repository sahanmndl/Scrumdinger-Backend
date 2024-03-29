import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const getProjects = async (req, res, next) => {

    const { page = 1, limit = 7 } = req.query

    let projects;
    try {
        projects = await Project.find().populate('user')
                                .limit(limit * 1)
                                .skip((page - 1) * limit)
                                .exec()

        if(!projects) {
            return res.status(404).json({message: "No projects found!"})
        }

        const count = await Project.find().populate('user').countDocuments()

        return res.status(200).json({
            projects,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        return console.log(err)
    }
}

export const createProject = async (req, res, next) => {
    const { title, description, image, category, priority, duedate, timestamp, user } = req.body

    console.log(user, typeof(user))
    let userExists
    try {
        userExists = await User.find({_id: user})
    } catch (err) {
        return console.log(err)
    }

    if(!userExists) {
        return res.status(400).json({message: "User not found!"})
    }

    const project = new Project({
        title,
        description,
        image,
        category,
        priority,
        duedate,
        timestamp,
        user
    })

    console.log(userExists[0])
    console.log(project, project.id, typeof(project.id))

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await project.save({session})
        userExists[0].projects.push({_id: project.id})
        await userExists[0].save({session})
        await session.commitTransaction()
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err})
    }

    return res.status(200).json({project})
}

export const updateProject = async (req, res, next) => {
    const { title, description, image, category, priority, duedate } = req.body
    const projectId = req.params.id

    let project
    try {
        project = await Project.findByIdAndUpdate(projectId, {
            title,
            description,
            image,
            category,
            priority,
            duedate
        })
    } catch (err) {
        return console.log(err)
    }

    if(!project) {
        return res.status(500).json({message: "Unable to update project"})
    }

    return res.status(200).json({project})
}

export const deleteProject = async (req, res, next) => {
    const projectId = req.params.id

    let project
    try {
        project = await Project.findByIdAndRemove(projectId).populate('user')
        await project.user.projects.pull(project)
        await project.user.save()
    } catch (err) {
        return console.log(err)
    }

    if(!project) {
        return res.status(500).json({message: "Unable to delete item"})
    }

    return res.status(200).json({message: "Project deleted!"})
}

export const getProjectById = async (req, res, next) => {
    const projectId = req.params.id

    let project
    try {
        project = await Project.findById(projectId)
    } catch (err) {
        return console.log(err)
    }

    if(!project) {
        return res.status(404).json({message: "Project not found!"})
    }

    return res.status(200).json({project})
}

export const getProjectsByUserId = async (req, res, next) => {
    const userId = req.params.id

    let userProjects
    try {
        userProjects = await User.findById(userId).populate('projects')
    } catch (err) {
        return console.log(err)
    }

    if(!userProjects) {
        return res.status(404).json({message: "No projects found!"})
    }

    return res.status(200).json({projects: userProjects})
}