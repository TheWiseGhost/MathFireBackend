import app from "./server.js";
import mongodb from "mongodb";
import problemsDAO from "./problemsDAO.js";
import {mongoUsername} from './auth.js';
import {mongoPassword} from './auth.js';

// Makes it easier to work with our database
const MongoClient = mongodb.MongoClient;

// uri is connection string
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@problemset.bv8sqse.mongodb.net/?retryWrites=true&w=majority`

// Common port
const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        // Just always set to true
        useNewUrlParser: true

    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => { // Starts the server
    // Way to send our database connection to reviewsDAO and allow it to access the database
    await problemsDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})

