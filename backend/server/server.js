/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const productRouter = require('../routers/productRouter');
const userRouter = require('../routers/userRouter');
const dotenv = require('dotenv');
const orderRouter = require('../routers/orderRouter');
const paymentPayuRouter = require('../routers/paymentPayuRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect (process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// ---------------------------------------------------------------------
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/build/index.html'));
});

// ------------------------------------------------------------------
// carga del compilado
app.use(express.static(path.join(__dirname, 'public/build')));

//lectura de json request
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment/payu', paymentPayuRouter);

//Middleware control errors
app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});
});

// -----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
});
