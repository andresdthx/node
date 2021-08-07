// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
const token = process.env.ACCESS_TOKEN || 'TEST-6869261542559696-072723-f51ff3d85be24511737466bdf252bfe2-798014454';
mercadopago.configure({
  access_token: token
});
  
const preferences = async (preference) => {
    return await mercadopago.preferences.create(preference);
}

module.exports = {
    preferences,
    mercadopago
}
