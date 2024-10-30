const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('AuthorModel', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('CourseModel', new mongoose.Schema({
  name: String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'AuthorModel'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
   author
   
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author','name -_id')   //feild in the course model,what to include and exclude
    .select('name');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '6721c29856fcff961c328975')

 listCourses();