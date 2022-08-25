import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import morgan from 'morgan';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import authRotes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paypalRoutes from './routes/paypalRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running ...')
})

app.use('/v1/api/auth', authRotes)
app.use('/v1/api/users', userRoutes)
app.use('/v1/api/products', productRoutes)
app.use('/v1/api/orders', orderRoutes)
app.use('/v1/api/paypal', paypalRoutes)
app.use('/v1/api/upload', uploadRoutes)

// __dirname not available if we use ES Modules it is only available if we use Common JS
// in ES modules we can mimic __dirname like this
const __dirname = path.resolve();

// Make upload folder static so it can be accessed from the browser
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_URL)))

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)