
const jwt = require('jsonwebtoken');
const { errors } = require('../network/response');

const generateToken = (user) =>{
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.name,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.slice(7, authorization.length); //Bearer XXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) =>{
            if(err){
                errors(req, res, 'invalid token', 401);
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        errors(req, res, 'not token', 401);
    }
}

module.exports = {
    generateToken,
    isAuth
};