import Joi from "joi"

const gameSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().min(1).required(),
    pricePerDay: Joi.number().integer().min(1).required()
})

export default gameSchema