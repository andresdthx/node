const mongoose = require('mongoose');

mongoose.connect (process.env.MONGODB_URL || 'mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});