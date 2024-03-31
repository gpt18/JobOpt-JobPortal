const { verifyJwtToken, getJwtPayload } = require("../helper/auth");

exports.addAuthPayload = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.json({
        message: "Unauthorized. Please provide valid credentials.",
        success: false
    });

    const token = authHeader.split("Bearer ")[1];
    const valid = verifyJwtToken(token);
    
    if(!valid) return res.json({
        message: "Unauthorized. Please provide valid credentials.",
        success: false
    });

    const jwtPayload = getJwtPayload(token);
    req.user = jwtPayload;

    next();
}