import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const rentDate = dayjs().format("YYYY-MM-DD")

    try {
        const gameIdExists = await db.query(`SELECT "id" FROM games WHERE id=$1;`, [gameId])
        const customerIdExists = await db.query(`SELECT "id" FROM customers WHERE id=$1;`, [customerId])
        const stock = await db.query('SELECT "stockTotal" FROM games WHERE id=$1;', [gameId])
        if (gameIdExists.rows.length === 0 || customerIdExists.rows.length === 0 || stock.rows[0].stockTotal === 0) return res.sendStatus(400)


        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id=$1`, [gameId])
        const originalPrice = pricePerDay.rows[0].pricePerDay * daysRented

        await db.query(`INSERT INTO rentals (
            "customerId", 
            "gameId", 
            "rentDate", 
            "daysRented", 
            "returnDate", 
            "originalPrice", 
            "delayFee"
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            ;`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
        await db.query('UPDATE games SET "stockTotal"=$1 WHERE id=$2;', [stock.rows[0].stockTotal - 1, gameId])
        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getRentals(_, res) {
    try {
        const rentals = await db.query(`SELECT 
        rentals.*, 
        JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer,
        JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        ;`)
        return res.send(rentals.rows)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function finishRental(req, res) {
    const { id } = req.params
    const today = dayjs().format('YYYY-MM-DD')

    try {
        const rent = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id])
        if (rent.rows.length === 0) return res.sendStatus(404)
        if (rent.rows[0].returnDate !== null) return res.sendStatus(400)

        const dayExpire = dayjs(rent.rows[0].rentDate).add(rent.rows[0].daysRented, "day")

        const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [rent.rows[0].gameId])
        const delayDays = dayjs(today).diff(dayExpire, 'day')

        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`, [today, delayDays < 0 ? 0 : delayDays * game.rows[0].pricePerDay, id])
        await db.query(`UPDATE games SET "stockTotal" = $1 WHERE id=$2;`, [game.rows[0].stockTotal + 1, rent.rows[0].gameId])
        return res.sendStatus(200)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params
    try{
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (rental.rows.length === 0) return res.sendStatus(404)
        if (rental.rows[0].returnDate === null) return res.sendStatus(400)

        await db.query(`DELETE FROM rentals WHERE id=$1`, [id])
        return res.sendStatus(200)
    }catch(err){
        return res.status(500).send(err.message)
    }
}