const {get} = require("lodash");
const {decode} = require("../utils/JWT.utils");

const deserializeUser = async (
    req,
    res,
    next
) => {

    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    if(!accessToken) return next();

    const {decoded, expired} = decode(accessToken);

    if(expired){
        return res.status(401).json({
            message: 'User token expired'
        })
    }

    if(decoded){
        req.userId = decoded.userId
    }

    return next();
}

module.exports = deserializeUser;