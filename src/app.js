import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor: http://localhost:${process.env.PORT}/`)
})