import { Router } from 'express'

const gamesRouter = Router()

gamesRouter.get("/games", (req,res) => {
    res.send('oi')
})
gamesRouter.post("/games", )

export default gamesRouter