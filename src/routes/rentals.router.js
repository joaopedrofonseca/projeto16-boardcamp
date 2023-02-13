import { Router } from 'express'
import { deleteRental, finishRental, getRentals, postRental } from '../controllers/rentals.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import rentalSchema from '../schemas/RentalsSchema.js'

const rentalsRouter = Router()

rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRental)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", finishRental)
rentalsRouter.delete("/rentals/:id",deleteRental)

export default rentalsRouter