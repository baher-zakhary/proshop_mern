import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { generateToken } from '../utils/authUtils.js'
import { UserDto } from '../dtos/UserDto.js';

// @desc    Auth user & get token
// @route   POST v1/api/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && await user.matchPassword(password)) {
        const userDto = new UserDto(user)
        userDto.token = generateToken(user._id, user.isAdmin)
        res.json(userDto)
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})