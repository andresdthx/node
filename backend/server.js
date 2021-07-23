/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');

const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');
const dotenv = require('dotenv');
const orderRouter = require('./routers/orderRouter');

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
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// ------------------------------------------------------------------
//lectura de json request
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

//Middleware control errors
app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});
});

// -----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
});
