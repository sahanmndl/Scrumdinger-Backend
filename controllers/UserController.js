import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (error) {
        return console.log(error)
    }

    if(!users) {
        return res.status(404).json({message: "No users found!"})
    }

    return res.status(200).json({users})
}

export const register = async (req, res, next) => {
    const { name, email, password } = req.body

    let userExists;
    try {
        userExists = await User.findOne({email})
    } catch (err) {
        return console.log(err)
    }
    if(userExists) {
        return res.status(400).json({message: "Email already registered with another user"})
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword,
        projects: []
    })
    try {
        await user.save()
    } catch (err) {
        return console.log(err)
    }

    return res.status(201).json({user})
}

export const login = async (req, res, next) => {
    const { email, password } = req.body

    let userExists
    try {
        userExists = await User.findOne({email})
    } catch (err) {
        return console.log(err)
    }
    if(!userExists) {
        return res.status(404).json({message: "Email not registered! Please sign up"})
    }

    const checkPassword = bcrypt.compareSync(password, userExists.password)
    if(!checkPassword) {
        return res.status(400).json({message: "Incorrect Password!"})
    }

    return res.status(200).json({message: "Login Successful!", user: userExists})
}

export const getUserById = async (req, res, next) => {
    const userId = req.params.id

    let user
    try {
        user = await User.findById(userId)
    } catch (err) {
        console.log(err)
    }

    if(!user) {
        return res.status(404).json({message: "User not found!"})
    }

    return res.status(200).json({user})
}