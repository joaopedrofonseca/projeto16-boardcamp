import { Router } from 'express'
import { getGame, insertGame } from '../controllers/games.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import gameSchema from '../schemas/gameSchema.js'

const gamesRouter = Router()

gamesRouter.get("/games", getGame)
gamesRouter.post("/games", validateSchema(gameSchema), insertGame)

export default gamesRouter