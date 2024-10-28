const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/playground')
 .then(()=>console.log('connected to MongoDB'))
 .catch(err=>console.log('Error: '+err.message));

 const courseSchema = new mongoose.Schema({
   name: String,
   author: String, 
   tags: [ String ],
   date: Date, 
   isPublished: Boolean,
   price: Number
 });

 //here Course is the class
 const Course = mongoose.model('Course',courseSchema);   //first argument is collection name,

 async function createCourse(params) {
    
    const course = new Course({
    name:'aaa Course',
    author:'Mosh',
    tags:['angular','frontend'],
    isPublished:false,
    price:14
 });
 const result = await course.save();
 console.log(result);
 }
 

 //To get document for db

 
 async function getCourses(){
    const courses= await Course
   //.find()
        //.and([{author:'Mosh'},{isPublished:true}])

   //start with Mosh
        .find({author:/^Mosh/})
   //end with Mosh
        // .find({author:/Mosh$/})

   //constains  Mosh
        //.find({author:/.*Mosh.*/})

        .limit(10)
        .sort({name:1})
        //.countDocuments();
        .select({name:1,tags:1})
        
    console.log( courses);
 }

 //Query First
 async function updateCourse(id) {
   try {
       const course = await Course.findById(id);
       if (!course) {
           console.log('Course not found');
           return;
       }

       course.set({
           isPublished: true,
           author: 'Another author - Mosh '
       });

       const updatedCourse = await course.save();
       console.log(updatedCourse);
   } catch (error) {
       console.error('Error updating course:', error);
   }
}


async function updatefirst(id){
   const course = await Course.updateOne({_id:id},{
   //const course = await Course.findByIdAndUpdate(id,{
      $set:{
         isPublished: true,
         author: 'new 11111'
     }
   },{upsert:true});
   //},{new:true});

   
   
   console.log(course);
}


async function update() {


   /*const course = await Course.findOneAndUpdate(
      { name: "Express.js Course" },
      { $set: { author: "Updated Author 1" } },
      { returnDocument: "before" }
  );*/


/*
  const course = await Course.updateOne(
   { _id: "5a68fdc3615eda645bc6bdec" },
   { $unset: { author: "" } }
);*/


/*
const course = await Course.updateOne(
   { _id: "5a68fdc3615eda645bc6bdec" },
   { $inc: { price : 5} }
);
*/

const course = await Course.updateOne(
   { _id: "5a68fdc3615eda645bc6bdec" },
   { $push: { author : 'updated author'} }    //create or update an array
);

  console.log(course);
   
}

async function removeCourse(id) {

const result = await Course.deleteOne({ _id: id })
console.log(result);
   
}


//createCourse();

getCourses();

//updatefirst('5a6900fff467be65019a9005');

//update();

//removeCourse('5a6900fff467be65019a9001');


