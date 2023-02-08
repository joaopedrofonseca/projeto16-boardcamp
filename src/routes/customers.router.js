import { Router } from 'express'

const customersRouter = Router()

customersRouter.get("/customers", (req,res) => {
    res.send("oi")
})
customersRouter.post("/customers/:id", )

customersRouter.put ("/customers/:id", )

export default customersRouter