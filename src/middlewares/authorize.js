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

const roleCustomer = (req, res, next) => {
    const { roles_id } = req.userInfo;
    if (roles_id === 1) {
        console.log(roles_id);
        return next();
    }
    res.status(403).json({ err: "You're not a Customer" })
}

const roleAdmin = (req, res, next) => {
    const { roles_id } = req.userInfo;
    if (roles_id === 2) {
        return next();
    }
    res.status(403).json({ err: "You're not a Admin" })
}

const roleOwner = (req, res, next) => {
    const { roles_id } = req.userInfo;
    console.log(roles_id);
    if (roles_id === 3) {
        return next();
    }
    res.status(403).json({ err: "You're not a Owner" })
}

module.exports = { checkToken, roleCustomer, roleAdmin, roleOwner };