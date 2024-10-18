/*
const path=require('path');
const pathobj=path.parse(__filename);
console.log(pathobj);
*/


//OS details

/*
const os=require('os');
var totolmemory=os.totalmem();
var freememory=os.freemem();

console.log(`Totolmemory : ${totolmemory} \n freememory: ${freememory}`);
*/


//file system module


const fs = require('fs');

var res=fs.readdirSync('./'); // Synchonous
console.log(res);

fs.readdir('./',function(error,filedir){
    if(error) console.log('error',error);
    else 
     console.log('Asyn result',filedir);
})