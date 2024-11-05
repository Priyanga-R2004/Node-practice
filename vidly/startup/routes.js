const express = require('express');
const path = require('path');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error.js');
const logger = require('../middleware/logger'); 

module.exports=function(app){
    app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

app.use(error);
}

/*app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
    //res.status(404).send({ message: 'Route not found' });
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});*/