import { Router } from 'express'
import { insertCustomer } from '../controllers/customers.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import customersSchema from '../schemas/customersSchema.js'

const customersRouter = Router()

customersRouter.get("/customers", (req,res) => {
    res.send("oi")
})
customersRouter.post("/customers", validateSchema(customersSchema),insertCustomer)

customersRouter.put ("/customers/:id", )

export default customersRouter