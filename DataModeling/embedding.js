const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('AuthorModel', authorSchema);

const Course = mongoose.model('CourseModel', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId)
{
  const course=await Course.findById(courseId);
  course.author.name = 'new author';
  course.save();
}

async function addAuthor(courseId,author) {
  const course=await Course.findById(courseId);
  course.authors.push(author);
  course.save();

}

async function removeAuthor(courseId,authorId) {
  const course=await Course.findById(courseId);
  course.authors.pull(authorId);
  course.save();

}

//createCourse('Express Course', [new Author({ name: 'Mosh' }),new Author({ name: 'John' })]);
//updateAuthor('6721c9b2fc6c7c19dd36942c');
removeAuthor('6721cb4016cfdd79bf6f932b','6721d109b87cbb42f3f5df27');