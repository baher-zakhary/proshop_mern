import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

export const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // req.user = await User.findById(decoded.id).select('-password')
            req.userId = decoded.id
            req.userIsAdmin = decoded.isAdmin
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

export const adminOnly = (req, res, next) => {
    if (req.userIsAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized')
    }
}
