import { Router } from 'express'
import { getRentals, postRental } from '../controllers/rentals.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import rentalSchema from '../schemas/RentalsSchema.js'

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", )
rentalsRouter.delete("/rentals/:id",)

export default rentalsRouter