const responseHelper = require("../helpers/responseHelper")

const register = (req, res, next) => {
    const { body } = req
    const registerBody = ["name", "email", "password", "address", "contact", "gender", "DoB", "created_at"];
    const bodyProperty = Object.keys(body);
    const isBodyValid =
        registerBody.filter((property) => !bodyProperty.includes(property))
        .length == 0
        ? true: false;
        if (!isBodyValid) return responseHelper.error(res, 400, "Invalid Body");
        next();
};

module.exports = { register }; 