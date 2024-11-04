const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Joi = require('joi');

router.get('/', async (req, res) => {
  const customers=await Customer.find().sort({name:1});
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message)};

 let customer = new Customer({
    _id:req.params.id,
    name: req.body.name,
    phone:req.body.phone,
    isGold:req.body.isGold
  });
 customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {

    const { error } = validateCustomer(req.body); 
    if (error) 
    {console.log(error);
      return res.status(400).send(error.details[0].message);
    }
  
    const customer = await Customer.findOneAndUpdate({_id:req.params.id},
      {name:req.body.name, 
        phone:req.body.phone,
        isGold:req.body.isGold},
      {returnDocument: "after"}
    )
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  
  res.send(customer);
});


router.delete('/:id', async (req, res) => {

    const customer = await Customer.findOneAndDelete({_id:req.params.id})
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  
    res.send(customer);
  });
  router.get('/:id', async (req, res) => {
  
    const customer = await Customer.findOne({_id:req.params.id})
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  });
  

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      phone: Joi.string().min(3).max(50).required(),
      isGold:Joi.boolean()
    });
  
    return schema.validate(customer);
  }
 

  
  
module.exports = router;

