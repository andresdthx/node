const { error } = require("../network/response");

const validateAdmin = (req, res, next) => {
    const { isAdmin } = req.body;
    if(!isAdmin){
        error(req, res, 'Not authirized', 401);
    }
    next();
}

const validateCart = (req, res, next) => {
    const { orderItems } = req.body;
    
    if(orderItems.length === 0) {
        error(req, res, 'Cart is empty');
    }

    next();
}

module.exports = {
    validateAdmin,
    validateCart
}