
const success = (req, res, data, status = 200) => {
    res.status(200).send(data);
}

const errors = (req, res, message, status = 400) => {
    res.status(status).send({ message: message });
}

module.exports = {
    success,
    errors
};
