const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

// Joi validation schema
const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(), // Max length adjusted to 255 to match Mongoose
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  });

  return schema.validate(movie);
};

// Mongoose schema and model
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
});

// Pre-save hook to run Joi validation before saving the document
movieSchema.pre('save', function(next) {
  const { error } = validateMovie({
    title: this.title,
    genreId: this.genre._id.toString(),
    numberInStock: this.numberInStock,
    dailyRentalRate: this.dailyRentalRate
  });

  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Export the model and the validation function
module.exports = {
  Movie,
  validate: validateMovie
};
