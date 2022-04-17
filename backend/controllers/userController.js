import asyncHandler from 'express-async-handler'
import { UserDto } from '../dtos/UserDto.js';
import User from '../models/userModel.js'
import { generateToken } from '../utils/authUtils.js';

// @desc    Get user by id
// @route   GET v1/api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const userDto = new UserDto(user)
        res.json(userDto)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Register a new user
// @route   POST /v1/api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        const userDto = new UserDto(user)
        res.status(201).json({
            ...userDto,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Update user
// @route PUT v1/api/users
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        const updatedUserDto = new UserDto(updatedUser)
        updatedUserDto.token = generateToken(updatedUser._id)
        res.json(updatedUserDto)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
