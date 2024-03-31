import app from "./server.js";
import mongodb from "mongodb";
import problemsDAO from "./problemsDAO.js";
import loginDAO from "./loginDAO.js";
import dotenv from 'dotenv';
dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
console.log(mongoUsername);

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
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => { // Starts the server
    await problemsDAO.injectDB(client);
    await loginDAO.injectDB(client);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
});

