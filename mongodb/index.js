const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/playground')
 .then(()=>console.log('connected to MongoDB'))
 .catch(err=>console.log('Error: '+err.message));

 const courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags:[String],
        date:{type:Date,default:Date.now},
        isPublished: Boolean
    }
 )

 //here Course is the class
 const Course = mongoose.model('Course',courseSchema);   //first argument is collection name,

 async function createCourse(params) {
    
    const course = new Course({
    name:'Angular Course',
    author:'Mosh',
    tags:['angular','frontend'],
    isPublished:true
 });
 const result = await course.save();
 console.log(result);
 }
 

 //To get document for db

 
 async  function getCourses(){
    const courses= await Course
        .find({author:'Mosh'})
        .limit(10)
        .sort({name:1})
        .select({name:1,tags:1});
  
    return courses;
 }


 //createCourse();
 getCourses();
/*var c=getCourses();
console.log(c);*/



