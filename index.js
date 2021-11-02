const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
const connection = require("./config/db")
const { setupRoutes } = require("./routes/index");
const port = process.env.PORT || 5000;

connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack)
    } else {
        console.log("database connected")
    }
})

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

setupRoutes(app);

app.get("/", (req, res) => {
    res.status(200).send("je suis dans le / test")
})

app.listen(port, () => { console.log(`listening on port http://localhost:${port}`) });
