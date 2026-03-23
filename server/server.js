/*global process*/
import cors from 'cors'
import 'dotenv'
import express from 'express'
import pool from './db/db.js'
import productsRouter from './routes/products.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

// Products API
app.use('/api/products', productsRouter)

app.listen(PORT, () => {
	pool
	console.log(`Server is running on ${PORT} port`)
})
