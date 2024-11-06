const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log(token, 'tokennn')
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    console.log(config, 'config',  config.get('jwtPrivateKey'))
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    console.log(decoded, 'decoded');
    req.user = decoded; 
    next();
  }
  catch (ex) {
    console.log(ex, 'ex')
    res.status(401).send('Invalid token.');
  }
}