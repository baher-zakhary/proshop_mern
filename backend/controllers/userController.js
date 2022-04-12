import asyncHandler from 'express-async-handler'
import { UserDto } from '../dtos/UserDto.js';
import User from '../models/userModel.js'

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