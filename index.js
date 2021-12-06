require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mainRouter = require("./src/routers/main");

const server = express();
const logger = morgan("combined");


const port = 8080;
server.listen(port, () => {
    console.log(`Server sudah berjalan di port ${port}`)
});

server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(logger);
server.use(mainRouter);

// expressApp.method(endpoint, handler1, handler2, dst)
server.get("/", (request, response) => {
    response.redirect("welcome");
});
server.get("/welcome", (req, res) => {
    res.status(303).json({
        msg: "Habissss",
    });
});
server.get(
    "/getdata",
    (req, res, next) => {
        let isValid = true;
        req.customValue = 1;
        if (isValid) {
            return next();
        }
        res.json({
            msg: "nilai tidak valid",
        });
    },
    (req, res) => {
        const {
            customValue
        } = req;
        res.json({
            customValue,
        });
    }
);
