const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Joi = require('joi');
const genreSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:3,
    maxlength:200
  }
});

const Genre= mongoose.model('Genre',genreSchema);


router.get('/', async (req, res) => {
  const genres=await Genre.find().sort({name:1});
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

 let genre = new Genre({
    
    name: req.body.name
  });
 genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate({_id:req.params.id},
    {name:req.body.name},
    {returnDocument: "after"}
  )
 
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  //genre.name = req.body.name; 
  res.send(genre);
});

router.delete('/:id', async (req, res) => {

  const genre = await Genre.findOneAndDelete({_id:req.params.id})
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

 // const index = genres.indexOf(genre);
 // genres.splice(index, 1);

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  
  const genre = await Genre.findOne({_id:req.params.id})
  //const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

/*
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}*/

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}


module.exports = router;