/*const http = require('http');
const server =http.createServer(); // here server is event emitter

server.on('connection',(socket)=>{
    console.log('new connection');

});

server.listen(3000);

console.log('Listening on port 3000..');


*/


const http = require('http');
const server =http.createServer((req,res)=>{
    if(req.url=='/'){
    res.write("Hello ");
    res.end();
    }
    if(req.url==='/api')
    {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }


}); 

server.listen(3000);

console.log('Listening on port 3000..');