const express = require('express')
const app = express()

// Display all superheros
app.get('/superheros', (req, res) => {
    res.json({msg: 'Showing all superheros' });
});

// Display superhero using ID
app.get('/superheros/:superHerold', (req, res) => {
    res.json({ msg: 'Superhero id is ' + req.params.superHerold });
});

//Create a new superhero
app.post('/superheros', (req, res) => {
    res.json({ msg: 'Creating superhero' });
});

//Edit superhero with ID
app.put('/superheros/:superHerold', (req, res) => {
    res.json({ msg: 'Editing superhero ' + req.params.superHerold });
});

//Delete superhero with ID
app.delete('/superheros/:superHerold', (req, res) => {
    res.json({msg: 'Deleting superhero ' + req.params.superHerold });
});

//Welcome to index
app.get('/', (req, res) => {
    res.json({msg: 'API server is running', version: 1})
});

//starting the server
app.listen(3000, console.log('Server started on port 3000.'));
