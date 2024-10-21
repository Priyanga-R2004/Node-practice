const express=require('express');
const app = express();
const Joi=require('joi');
app.use(express.json());


const courses = [
    
    {id:1,name:'c1',},
    {id:2,name:'c2'},
    {id:3,name:'c3'},

]

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.put('/api/courses/:id',(req,res)=>{
    const course= courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)
   {
    return res.status(404).send('The course not found');
   }

   
   //const result=validateCourse(req.body);
   const {error}=validateCourse(req.body);  //object destructuring
   if(error)
   {
    res.status(400).send(error.details[0].message);  //bad request
    return;
   }
   course.name=req.body.name;
   res.send(course);


});
function validateCourse(c)
{
    const schema={
        name:Joi.string().min(3).required()
       };
       return Joi.validate(c,schema);
}


app.delete('/api/courses/:id',(req,res)=>{
    const course= courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)
   {
     return res.status(404).send('The course not found');
   }
   const index=courses.indexOf(course)
   courses.splice(index,1)  //go to index and remove 1 object

   res.send(course);
});


const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listning on port ${port}..`));