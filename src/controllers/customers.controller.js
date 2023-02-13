import { db } from "../database/database.connection.js"

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const isCpfNotAvailable = await db.query(`SELECT cpf FROM customers WHERE cpf = $1;`, [cpf])
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
    const { id } = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [id])
        if (customer.rows.length === 0) return res.sendStatus(404)
        return res.status(200).send(customer.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params
    const { name, phone, cpf, birthday } = req.body
    try {
        const isCpfNotAvailable = await db.query(`SELECT cpf FROM customers WHERE cpf = $1 AND id!=$2;`, [cpf, id])
        if (isCpfNotAvailable.rows.length !== 0) return res.sendStatus(409)

        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [name, phone, cpf, birthday, id])
        return res.send(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}