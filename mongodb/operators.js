const mongoose = require('mongoose');
const { Schema, model } = mongoose;
mongoose.connect('mongodb://localhost/playground')
 .then(()=>console.log('connected to MongoDB'))
 .catch(err=>console.log('Error: '+err.message));

 // Define the schema
const UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    status: String,
    description: String,
    code: String,
    age: Number,
  });
  
  // Create the model
  const User = model('User', UserSchema);

  const seedUsers = async () => {
    await User.insertMany([
      { name: 'Alice', email: 'alice@example.com', username: 'adminUser', status: 'Active', description: 'Friendly and energetic', code: 'A123', age: 25 },
      { name: 'Bob', email: 'bob@example.org', username: 'bob123', status: 'Pending', description: 'Has excellent coding skills', code: 'B123', age: 30 },
      { name: 'Charlie', email: 'charlie@sample.com', username: 'chaz', status: 'Inactive', description: 'Enjoys team collaboration', code: 'C456', age: 22 },
      { name: 'adminMaster', email: 'admin@sample.com', username: 'adminMaster', status: 'Active', description: 'Admin privileges enabled', code: 'A789', age: 35 },
      { name: 'Danny', email: 'danny@example.net', username: 'dannyD', status: 'Active', description: 'Friendly but reserved', code: 'D888', age: 28 },
    ]);
    console.log("Sample users inserted.");
  };
  
 // seedUsers();

 //User.find({ name: /alice/i }).then(console.log);


 //User.find({ username: /^admin/ }).then(console.log);


//User.find({ email: /\.com$/ }).then(console.log);

//character set matching
//User.find({ status: /[t]/ }).then(console.log);


User.find({ status: /Active|Pending/ }).then(console.log);


//User.find({ code: /\d/ }).then(console.log);

//Grouping
//User.find({ description: /friendly (and energetic|but reserved)/i }).then(console.log);
