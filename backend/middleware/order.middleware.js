const validateAdmin = (req, res, next) => {
    const { isAdmin } = req.body;
    if(!isAdmin){
        res.status(401).send('No authorized');
    }
    next();
}

module.exports = {
    validateAdmin
}