const express = require('express');
const { preferences, mercadopago } = require('../../calls/MarcadoPagoCalls');

const mercadoPagoRouter = express.Router();

mercadoPagoRouter.post('/preference', async(req, res)=>{

    const preference = await preferences(req.body.preference);
    res.send(preference.body.id);
});

module.exports = mercadoPagoRouter;