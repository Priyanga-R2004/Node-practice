const config=require('config');

const express=require('express');
const app = express();
const logger=require('./logger');
const Joi=require('joi');
const helmet = require('helmet');
const morgan=require('morgan');

app.set('view enging','pug');
app.set('views','./views'); //default

/*
//to check the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`APP: ${app.get('env')}`);
*/


//Configuration
console.log('Application name :'+config.get('name') );
console.log('Mail Server :'+config.get('mail.host') );
console.log('Mail password :'+config.get('mail.password') );
const courses = [
    
    {id:1,name:'c1',},
    {id:2,name:'c2'},
    {id:3,name:'c3'},

]
app.use(helmet());
if(app.get('env')==='development')
{
    app.use(morgan('tiny'));
    console.log('morgon enabled...');
}
app.use(express.json());

app.use(express.urlencoded({extended:true}));  //key=value

app.use(logger);


app.use(function(req,res,next){
    console.log('authentication...');
    next();
})
app.use(express.static('public'));
app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.post('/api/courses',(req,res)=>{

    // Using Joi to check the condition the the course name is required and greater than 3 character
    
        const schema = {
            name:Joi.string().min(3).required()
        }
        const result=Joi.validate(req.body,schema);
    
        if(result.error)
        {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        const c={
            id:courses.length+1,
            name:req.body.name
        };
        courses.push(c);
        res.send(c);
    })
    

const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening to the port ${port}`));