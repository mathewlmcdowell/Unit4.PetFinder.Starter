const pets = require('./data');
const express = require('express');
const app = express();

const PORT = 8080;


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/v1/pets', (req, res) => {

    res.send(pets);
});

app.get('/api/v1/pets/owner', (req, res) => {

    const { owner } = req.query;
    const pet = pets.filter(pet => pet.owner.toLowerCase() === owner.toLowerCase());
    res.send(pet);
});

app.get('/api/v1/pets/:name', (req, res) => {

    const name = req.params.name;
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());
    res.send(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;