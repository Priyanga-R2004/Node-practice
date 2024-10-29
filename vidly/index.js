const Joi = require('joi');
const genres = require('./routes/genres');
const customers=require('./routes/customers');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  . then(()=>console.log('connected to mongoDB'))
  .catch(err=>console.error('could not connect to MongoDB'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers',customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));