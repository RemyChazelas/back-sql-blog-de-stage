const express = require("express")
const mysql = require("../config/db")

const router = express.Router()

router.get("/", (req, res) => {
    const sql = "SELECT * FROM posts"
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
    const sql = "SELECT * FROM posts WHERE id = ?"
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
    const sql = `INSERT INTO posts (title, content, author, likes) VALUES (?, ?, ?, ?)`
    const values = [req.body.title, req.body.content, req.body.author, req.body.likes]
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
    const sql = `UPDATE posts SET ? WHERE id = ?`
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
    const sql = `DELETE FROM posts WHERE id = ?`
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
