import asyncHandler from 'express-async-handler'
import { UserDto } from '../dtos/UserDto.js';
import User from '../models/userModel.js'
import { generateToken } from '../utils/authUtils.js';

// @desc    Get user profile
// @route   GET v1/api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);
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
            token: generateToken(userId)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})