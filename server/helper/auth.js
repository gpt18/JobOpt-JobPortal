const jwt = require("jsonwebtoken");

function getJwtToken(payload, expiresIn = '1d') {
    if(!payload) return null;

    return jwt.sign(payload, process.env.SECRET, { expiresIn });

}

function verifyJwtToken (token) {
    if(!token) return null;

    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return null;
    }
}

function getJwtPayload(token){
    if(!token) return null;

    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}

module.exports = {
    getJwtToken,
    verifyJwtToken,
    getJwtPayload,
}