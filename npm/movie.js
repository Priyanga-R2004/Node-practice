const express=require('express');
const { isEmpty } = require('underscore');
const Joi = require('joi');
const app=express();

app.use(express.json());

const genres = [
    {id:1,name:'horror',movie:'h1'},
    {id:2,name:'action',movie:'a1'},

];
app.get('/api/genres',(req,res)=>{
    if(isEmpty(genres))
    {
        return res.send('No genre found');
    }
    res.send(genres);
});

app.get('/api/genres/:id/:name',(req,res)=>{
    const genre=genres.find(g=>g.name===req.params.name);

    if(!genre)
    {
        return res.send('No such genre found');
    }
    res.send(genre);
});

app.post('/api/genres',(req,res)=>{
     const schema ={
        name:Joi.string().required(),
        movie: Joi.string().required()
     }
      const result=Joi.validate(req.body,schema);
      if(result.error){
        return res.status(400).send(result.error.details[0].message);
      }

    const g={
        id:genres.length+1,
        name:req.body.name,
        movie:req.body.movie
    };
    genres.push(g);
    res.send(g);
    console.log(genres);

    })

app.put('/api/genres/:name',(req,res)=>{
    const genre=genres.find(g=>g.name===req.params.name);

    if(!genre)
    {
        return res.send('No such genre found');
    }
    const schema ={
        name:Joi.string().required(),
        movie:Joi.string().required()
     }
      const result=Joi.validate(req.body,schema);
      if(result.error){
        return res.status(400).send(result.error.details[0].message);
      }
        genre.name=req.body.name;
        genre.movie=req.body.movie;
    
    
    res.send(`"${genre.name}" genre is updated`);

});

app.delete('/api/genres/:name',(req,res)=>{

    const genre=genres.find(g=>g.name===req.params.name);

    if(!genre)
    {
        return res.send('No such genre found');
    }
    const index=genres.indexOf(genre);
    genres.splice(index,1);
    res.send(`"${genre.name}" genre is deleted`);

});


const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listning on port ${port}..`));