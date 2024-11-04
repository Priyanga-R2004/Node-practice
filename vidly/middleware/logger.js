
const winston = require('winston');
require('winston-mongodb'); 
require('express-async-errors');
const logger = winston.createLogger({
  level: 'error', // Set to 'error' to capture error logs
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly', // Change to your MongoDB URI
      collection: 'logs', // Name of the collection for logs
      level: 'error', // Log only error messages
      tryReconnect: true
    }),
  ],
});


process.on('unhandledRejection', (ex) => {
    throw ex;
 // logger.log(ex.message, { metadata: ex });
  //process.exit(1);
});
winston.exceptions.handle(
    
    new winston.transports.File({filename:'uncaughtExceptions.log'})
)
/*
process.on('uncaughtException', (ex) => {
  logger.error(ex.message, { metadata: ex });
  //process.exit(1);
});
*/

module.exports = logger;
