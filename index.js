require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./src/routers/main");

const server = express();
const logger = morgan(
    ":method :url :status :res[content-length] - :response-time ms"
);


const port = 8080;
server.listen(port, () => {
    console.log(`Server sudah berjalan di port ${port}`)
});

const corsOptions = {
    origin: "*",
    allowHeaders: "x-access-token",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
server.use(cors(corsOptions));
server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(logger);
server.use(mainRouter);