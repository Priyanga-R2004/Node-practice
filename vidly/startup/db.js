//const logger = require("../middleware/logger");
//const winston =require('winston');
const mongoose = require('mongoose');
module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
 
  
}