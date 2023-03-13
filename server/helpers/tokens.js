const jwt = require("jsonwebtoken");

exports.ganareteToken = (payload, expired) => {
    return jwt.sign(payload, process.env.JWT_GEN,{
        expiresIn: expired
    })
}

exports.verifyToken = (payload) => {
    return jwt.verify(payload, process.env.JWT_GEN)
}

