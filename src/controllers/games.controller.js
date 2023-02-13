import { db } from "../database/database.connection.js"

export async function insertGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body

    try {
        const nameNotAvailable = await db.query(`SELECT * FROM games WHERE name=$1;`, [name])
        if (nameNotAvailable.rows.length !== 0) return res.sendStatus(409)

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])
        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}