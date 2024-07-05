## Introduction to Node JS and Express JS

1. Initiate Node JS project using `npm init`
2. Install **Express**.
    
    ```cli
    npm i express
    ```

3. Create a file called `server.js`
4. Enter below code to start the server. 

    ```js
    const express = require('express')
    const app = express()

    //route
    app.get('/', (req,yes) => {
        res.send('Hello World!');
    });

    //starting the server
    app.listen(3000, console.log('Server started on port 3000.'));

    ```

5. Start the server by typing `node server.js`.
6. Output:

    ![server 1](./images/1.JPG)

7. At first, the browser does not update each time a new code is saved. We have to terminate the server using `ctrl + c` and then restart the server again to deploy the change. To enable the feature add below package. 
    ```cli
    npm i -D nodemon
    ```

8. CHange the entry in `package.json` under `Scripts` from `"test": "echo \"Error: no test specified\" && exit 1"` to: 
    ```json
    "dev": "nodemon server.js"
    ```

9. Run the server using 
    ```cli
    npm run dev
    ```


## Getting started in JSON, Postman

1. Download Postman.

2. Add below line to the code to check JSON syntax insetad of `res.send` line. 

    ```js
    res.json({msg: 'API server is running', version: 1})
    ```

3. Install Postman and run it. 
4. You can send GET request from the Postman to `http://localhost:3000/` to get the message body. 

## Connecting MongoDB atlas 

Username: Piyumi
Password: firstprojectinnode

```js 
"mongodb+srv://piyumi:firstprojectinnode@cluster0.wiqvakz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
```

1. Create a MongoDB database in MongoDB Atlas cloud. After changing username and password, keep the default settings. 
2. Create a separate folder in the working directory as `config` and a file called `db.js`. Add below code. 

```js
const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://piyumi:firstprojectinnode@cluster0.wiqvakz.mongodb.net/mynodejsdb?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URI);
        console.log('DB connected.');
    } catch (error) {
        console.log('Error while connecting' + error.message)
    }
}

module.exports = connectDB;
```

The URL for the db can be found from the `connect` button in the database. Create the database called `mynodejsdb` when entering the URL to the code. Add `mynodejsdb` part between the `monbodb.net/` and `?retryWrites=true`. 

Database UI:

![DB](./images/2.JPG)

Terminal output:

![DB 2](./images/3.JPG)

## DB model creation and CRUD

Here we create and interact with a MongoDB database using Mongoose in a Node.js application.

1. Create a `models` folder to store Mongoose models.
2. Create `heroModel.js` in the `models` folder to define the Hero schema and model.

3. Import Mongoose: `const mongoose = require('mongoose');`

4. Define the schema for the Hero model:
     ```javascript
     const heroSchema = new mongoose.Schema({
         superheroname: { type: String, required: true },
         name: { type: String, required: true }
     });
     ```
   - Create and export the Hero model:
     ```javascript
     module.exports = mongoose.model('Hero', heroSchema);
     ```

4. Edit `server.js` to set up the Express server and handle routes. Import necessary modules and connect to MongoDB.
     ```javascript
     const express = require('express');
     const app = express();
     const connectDB = require('./config/db');
     const Hero = require('./models/heroModel');

     connectDB();
     app.use(express.json());
     ```

5. Add CRUD Operations to the `server.js` to read, write, modify and delete the entries.

6. Add Middleware to `server.js`. Use Express JSON middleware to parse JSON request bodies:
     ```javascript
     app.use(express.json());
     ```

**Final `server.js` code**

```javascript
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Hero = require('./models/heroModel');

connectDB();

app.use(express.json());

// Display all superheroes
app.get('/superheros', async (req, res) => {
    try {
        const heros = await Hero.find({});
        res.json(heros);
    } catch(error) {
        console.log(error);
    }
});

// Display superhero using ID
app.get('/superheros/:superHeroId', async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.superHeroId);
        res.json(hero);
    } catch (error) {
        console.log(error);
    }
});

// Create a new superhero
app.post('/superheros', async (req, res) => {
    try {
        await Hero.create({
            superheroname: req.body.superheroname,
            name: req.body.name
        });
        res.json({msg: 'Superhero created.'});
    } catch (error) {
        console.log(error);
    }
});

// Edit superhero with ID
app.put('/superheros/:superHeroId', async (req, res) => {
    try {
        await Hero.findByIdAndUpdate(req.params.superHeroId, {
            superheroname: req.body.superheroname,
            name: req.body.name
        });
        res.json({msg: 'Superhero edited.'});
    } catch (error) {
        console.log(error);
    }
});

// Delete superhero with ID
app.delete('/superheros/:superHeroId', async (req, res) => {
    try {
        await Hero.findByIdAndDelete(req.params.superHeroId);
        res.json({msg: 'Superhero deleted.'});
    } catch (error) {
        console.log(error);
    }
});

// Welcome to index
app.get('/', (req, res) => {
    res.json({msg: 'API server is running', version: 1});
});

// Starting the server
app.listen(3000, console.log('Server started on port 3000.'));
```
