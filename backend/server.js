/* eslint-disable no-undef */
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');

mongoose.connect (process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// ---------------------------------------------------------------------

// app.get('/api/products/:id', (req, res)=>{
//   const product = data.products.find(x => x._id === req.params.id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({message: 'Product not found'});
//   }
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// ------------------------------------------------------------------

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

//Middleware control errors
app.use((err, req, res, next) =>{
  res.status(500).send({message: err.message});
});

// -----------------------------------------------------------------

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
});
