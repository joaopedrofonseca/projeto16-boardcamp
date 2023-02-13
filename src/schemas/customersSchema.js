import Joi from "joi"


const customersSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().length(11).required(),
    cpf: Joi.string().length(11).required(),
    birthday: Joi.date().required()
})

export default customersSchema