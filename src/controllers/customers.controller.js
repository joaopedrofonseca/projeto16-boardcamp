import { db } from "../database/database.connection.js"

export async function insertCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body
    try {
        const isCpfNotAvailable = await db.query(`SELECT cpf FROM customers WHERE cpf = $1`, [cpf])
        if (isCpfNotAvailable) return res.sendStatus(409)
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])
        return res.send(201)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}