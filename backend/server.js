const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const data = require('./data');

app.get('/api/products', (req, res)=>{
  res.send(data.products);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
