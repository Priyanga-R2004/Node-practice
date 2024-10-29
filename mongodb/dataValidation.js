const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error: ' + err.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category:{
    type:String,
    required:true,
    enum:['web','mobile','network'],
    lowercase:true,
    //uppercase:true,
    trim:true
  },
  author: String,
  tags: {
    type:Array,
    validate :{
        isAsync:true,
        validator : function(v){
            return new Promise((resolve)=>{
           setTimeout(()=>{
            const result = v && v.length>0;
            resolve(result);
        },4000);
    });
    },
        message:'The course should have atleast one tag '
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;

    },
    get :v=>Math.round(v),
    set:v=>Math.round(v)
  }
});

const Course = mongoose.model('ValidationCourse', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'React',
    category:'Web',
    author: 'Mosh',
    tags: ['react','frontend'],
    isPublished: true,
    price: 14.88
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log('Error:', err);
  }
}

async function getCourses(){
    const course= await Course.find({_id:'67206dae3ce9f61159ff49d7'})
    console.log(course[0].price);

}
//createCourse();

getCourses();