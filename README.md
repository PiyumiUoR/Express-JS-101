1. `npm init`
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