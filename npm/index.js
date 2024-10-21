const express =require('express');
const app=express();
app.use(express.json());
const home = require('./home');


app.set('view engine','pug');
app.set('views','./views'); //default


const courses=require('./courses');
app.use('/api/courses',courses);
app.use('/',home);


const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listning on port ${port}..`));