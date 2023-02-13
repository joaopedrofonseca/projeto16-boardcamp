import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import gameSchema from '../schemas/gameSchema.js'

const gamesRouter = Router()

gamesRouter.get("/games", (req,res) => {
    res.send('oi')
})
gamesRouter.post("/games", validateSchema(gameSchema), )

export default gamesRouter