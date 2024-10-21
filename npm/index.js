const express =require('express');
const app=express();
const Joi = require('joi');
app.use(express.json());

const courses = [
    
        {id:1,name:'c1',},
        {id:2,name:'c2'},
        {id:3,name:'c3'},
    
]
app.get('/',(req,res)=>{
    res.send("Hello");
});
/*app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params);
});
*/


app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

//Get requsted id from the course array

app.get('/api/courses/:id',(req,res)=>{
   const course= courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)
   {
    res.status(404).send('The course not found');
   }
   res.send(course);
})

app.get('/api/courses/:id/:name',(req,res)=>{
    const course= courses.find(c=>c.name===req.params.name)
    if(!course)
    {
     res.status(404).send('The course not found');
    }
    res.send(course.name);
 })

// post collection of courses
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

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listning on port ${port}..`));