const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    const token = req.header("x-access-token");
    // console.log("[DEBUG] TOKEN", token);
    // next;
    const jwtOptions = {
        issuer: process.env.ISSUER,
    }
    jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
        if (err) return res.status(403).json({
            err
        });
        const { id, name, email } = payload;
        req.userInfo = { id, name, email };
        next();
    });
};

module.exports = { checkToken };