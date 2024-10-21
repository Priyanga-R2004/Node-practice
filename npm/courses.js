const express=require('express');
const router=express.Router();
const Joi=require('joi');

const courses = [
    
    {id:1,name:'c1',},
    {id:2,name:'c2'},
    {id:3,name:'c3'},

]

router.get('/:id',(req,res)=>{
    res.send(req.params);
});



router.get('/',(req,res)=>{
    res.send(courses);
})

//Get requsted id from the course array

router.get('/:id',(req,res)=>{
   const course= courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)
   {
    res.status(404).send('The course not found');
   }
   res.send(course);
})

router.get('/:id/:name',(req,res)=>{
    const course= courses.find(c=>c.name===req.params.name)
    if(!course)
    {
     res.status(404).send('The course not found');
    }
    res.send(course.name);
 })

// post collection of courses
router.post('/',(req,res)=>{

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


router.put('/:id',(req,res)=>{
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


router.delete('/:id',(req,res)=>{
    const course= courses.find(c=>c.id===parseInt(req.params.id))
   if(!course)
   {
     return res.status(404).send('The course not found');
   }
   const index=courses.indexOf(course)
   courses.splice(index,1)  //go to index and remove 1 object

   res.send(course);
});



module.exports=router;

