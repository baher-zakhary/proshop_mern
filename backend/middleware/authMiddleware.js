import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // req.user = await User.findById(decoded.id).select('-password')
            req.userId = decoded.id
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!authorization) {
        res.status(401)
        throw new Error('Not Authorized')
    }
})