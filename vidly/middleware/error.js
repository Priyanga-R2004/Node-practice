const logger = require('./logger');
const winston = require('winston');
module.exports = function(err,req,res,next){

  winston.error(err.message,err);
    res.status(500).send('something failed..');
  
  /*
    error
    warn
    info
    verbose
    debug
    silly
  */
  }
  