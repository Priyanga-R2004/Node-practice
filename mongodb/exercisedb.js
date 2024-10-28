const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercise')
        .then(()=>console.log('connected to MongoDB -mongo-exercise'))
        .catch(err=>console.log('Error: '+err.message));


const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function  getCourses(){
    const course=await Course
    .find({tags:'backend' , isPublished: true})
    .sort({name:1})
    .select({name:1,author:1});

  console.log(course);

}

async function getCourses2()
{
  /*const c=await Course
              .find({tags:{$in:['frontend','backend']},isPublished:true})
              .sort({price:-1})
              .select({name:1,author:1,price:1});*/
 const c=await Course
            .find({tags:{$in:['frontend','backend']},isPublished:true})
            .sort('-price')
            .select('name author price');
  console.log(c);
}

async function getCourses3() {
  const c=await Course
                .find({isPublished:true})
                .or([{price:{$gte:15}},{name:/.*by.*/}]);
  console.log(c);
  
}
//getCourses();
//getCourses2();
getCourses3();