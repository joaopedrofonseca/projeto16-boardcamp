import { Router } from 'express'
import { insertCustomer, listCustomers, listCustomersById, updateCustomer } from '../controllers/customers.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import customersSchema from '../schemas/customersSchema.js'

const customersRouter = Router()

customersRouter.get("/customers", listCustomers)
customersRouter.get("/customers/:id", listCustomersById)
customersRouter.post("/customers", validateSchema(customersSchema),insertCustomer)
customersRouter.put ("/customers/:id", validateSchema(customersSchema),updateCustomer)

export default customersRouter