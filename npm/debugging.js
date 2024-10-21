const express=require('express');
const app = express();
const morgan=require('morgan');

//debug module

const startupDebugger = require('debug')('app:startup'); //startup,db is the arbitary namespace .given in function parameter
const dbDebugger = require('debug')('app:db');

//set DEBUG=app:startup

if(app.get('env')==='development')
{
        app.use(morgan('tiny'));
        startupDebugger('morgon enabled...');
}

const courses = [
    
    {id:1,name:'c1',},
    {id:2,name:'c2'},
    {id:3,name:'c3'},

]
app.get('/api/courses',(req,res)=>{
    res.send(courses);
})
//database work
dbDebugger('connected to the database');
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening to the port ${port}`));