var url = 'http://mylogger.io/log';
console.log(__filename);
console.log(__diename);
function log(msg)
{
    console.log('in logger '+msg);
}

module.exports = log;
