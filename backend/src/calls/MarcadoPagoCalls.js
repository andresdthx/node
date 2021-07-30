// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
const token = process.env.ACCESS_TOKEN || 'APP_USR-6869261542559696-072723-55d8e74f67b87a7095d9dbcfc995aad8-798014454';
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
