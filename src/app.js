import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import gamesRouter from './routes/games.router.js'
import customersRouter from './routes/customers.router.js'
import rentalsRouter from './routes/rentals.router.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use([gamesRouter, customersRouter, rentalsRouter])

app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor: http://localhost:${process.env.PORT}/`)
})