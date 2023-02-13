import Joi from "joi"

const gameSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().required(),
    pricePerDay: Joi.number().required()
})

export default gameSchema