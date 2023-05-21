const {errorHandler} = require("./exceptions/ErrorHandler");

const express = require("express");
const cors = require("cors");
const db = require("./models");
const router = require("./routes");
const deserializeUser = require("./middleware/deserializeUser");

const port = 5001;
const host = "127.0.0.1";

const app = express();
app.use(cors())
app.use(express.json());
app.use(deserializeUser)

app.use('/api',router)
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

db.sequelize.authenticate().then(() => {
    console.info('Database connection has been established successfully.');
    db.sequelize.sync({
        alter:true
    }).then(() => {
        app.listen(port, host, () => {
            console.log("Server started successfully.")
        })
    })
})

process.on('uncaughtException', (error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    errorHandler.handleError(error);
});