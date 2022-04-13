import express from 'express'
import { getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/profile').get(protect, getUserProfile)

export default router