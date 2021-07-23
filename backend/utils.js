
const jwt = require('jsonwebtoken');

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
        jwt.verify(token, proccess.env.JWT_SECRET || 'somethingsecret', (err, decode) =>{
            if(err){
                res.status(401).send({message: 'Invalid token'});
            } else {
                res.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({message: 'No token'});
    }
}

module.exports = {
    generateToken,
    isAuth
};