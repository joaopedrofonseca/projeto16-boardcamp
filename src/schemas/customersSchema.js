import JoiBase from "joi"
import JoiDate from "@joi/date"

const Joi = JoiBase.extend(JoiDate)


const customersSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]+$/, 'numbers').min(10).max(11).required(),
    cpf: Joi.string().regex(/^[0-9]{11}$/).required(),
    birthday: Joi.date().format("YYYY-MM-DD").required()
})

export default customersSchema