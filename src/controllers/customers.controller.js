import { db } from "../database/database.connection.js"

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const isCpfNotAvailable = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [cpf])
        console.log(isCpfNotAvailable.rows)
        if (isCpfNotAvailable.rows.length !== 0) return res.sendStatus(409)
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])
        return res.send(201)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function listCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers;`)
        return res.status(200).send(customers.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function listCustomersById(req, res) {
    const {id} = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
        res.status(200).send(customer.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}