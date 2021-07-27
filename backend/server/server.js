const express = require('express');
const path = require('path');

const dotenv = require('dotenv');
const userRouter = require('../routers/userRouter');
const orderRouter = require('../routers/orderRouter');
const productRouter = require('../routers/productRouter');
const paymentPayuRouter = require('../routers/paymentPayuRouter');
const mercadoPagoRouter = require('../routers/payments/mercadoPagoRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ---------------------------------------------------------------------
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

//render del campilado
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/frontend/index.html'));
});

// ------------------------------------------------------------------
// carga del compilado
app.use(express.static(path.join(__dirname, '../public/frontend')));

//lectura de json request
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment/payu', paymentPayuRouter);
app.use('/api/payment/mercado-pago', mercadoPagoRouter);

//Middleware control errors
app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});
});

// -----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
});
