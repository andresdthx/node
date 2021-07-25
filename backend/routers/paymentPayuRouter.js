const express = require('express');
const { getBanks, PsePayment } = require('../calls/PayuCalls');

const paymentPayuRouter = express.Router();

paymentPayuRouter.get('/getBanks', async (req, res) => {
    const response = await getBanks();
    res.send(response.data);
});

paymentPayuRouter.post('/pse/submit', async (req, res) => {
    // res.send(req.body);
    const response = await PsePayment(req.body.dataTransaction, req.body.order);
    res.send(response.data);
})

module.exports = paymentPayuRouter;