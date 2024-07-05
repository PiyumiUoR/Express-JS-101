const express = require('express')
const app = express()
const connectDB = require('./config/db')
const Hero = require('./models/heroModels')

connectDB();

app.use(express.json())

// Display all superheros
app.get('/superheros', async (req, res) => {
    // res.json({msg: 'Showing all superheros' });
    try {
        const heros = await Hero.find({});
        res.json(heros);
    } catch(error) {
        console.log(error);
    }
});

// Display superhero using ID
app.get('/superheros/:superHeroId', async (req, res) => {
    // res.json({ msg: 'Superhero id is ' + req.params.superHeroId });
    try {
        const hero = await Hero.findById(req.params.superHeroId);
        res.json(hero);
    } catch (error) {
        console.log(error)
    }
});

//Create a new superhero
app.post('/superheros', async (req, res) => {
    // res.json({ msg: 'Creating superhero' });
    try {
        await Hero.create({
            superheroname: req.body.superheroname,
            name: req.body.name
        });
        res.json({msg: 'Superhero created. '})
    } catch (error) {
        console.log(error)
    }
});

//Edit superhero with ID
app.put('/superheros/:superHeroId', async (req, res) => {
    // res.json({ msg: 'Editing superhero ' + req.params.superHeroId });
    try {
        await Hero.findByIdAndUpdate(req.params.superHeroId, {
            superheroname: req.body.superheroname,
            name: req.body.name
        });
        res.json({msg: 'Superhero edited. '})
    } catch (error) {
        console.log(error)
    }
});

//Delete superhero with ID
app.delete('/superheros/:superHeroId', async (req, res) => {
    // res.json({msg: 'Deleting superhero ' + req.params.superHeroId });
    try {
        await Hero.findByIdAndDelete(req.params.superHeroId);
        res.json({msg: 'Superhero deleted. '});
    } catch (error) {
        console.log(error)
    }
});

//Welcome to index
app.get('/', (req, res) => {
    res.json({msg: 'API server is running', version: 1})
});

//starting the server
app.listen(3000, console.log('Server started on port 3000.'));
