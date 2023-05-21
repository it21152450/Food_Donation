const jwt = require("jsonwebtoken");

const privateKey = "private-key"

const sign = (object, options) => {
    return jwt.sign(object, privateKey, options);
}

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, privateKey);
        return { valid: true, expired: false, decoded };
    } catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}

module.exports = {sign, decode}