const express = require("express")
const mysql = require("../config/db")

const router = express.Router()

router.get("/", (req, res) => {
    const sql = "SELECT * FROM users"
    mysql.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving recup all data from database", err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const sql = "SELECT * FROM users WHERE id = ?"
    const values = [id]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving recup one data from database", err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.post("/", (req, res) => {
    const sql = `INSERT INTO users (pseudo, likes) VALUES (?, ?)`
    console.log(req.body)
    const values = [req.body.pseudo, req.body.likes]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving create data from database", err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const sql = `UPDATE users SET ? WHERE id = ?`
    console.log(req.body)
    const values = [req.body, id]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving update data from database", err)
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM users WHERE id = ?`
    const values = [id]
    mysql.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving delete data from database")
        } else {
            console.table(result)
            res.status(200).json(result)
        }
    })
})

module.exports = router
