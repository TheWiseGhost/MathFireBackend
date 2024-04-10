// File to insert problems into the database
// Makes it much easier to insert problems to be honest
import mongodb from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const MongoClient = mongodb.MongoClient;

// uri is connection string
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@problemset.bv8sqse.mongodb.net/?retryWrites=true&w=majority`
let problems;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => { 
    try {
        problems = await client.db().collection("Problems");
        console.log("Connected to Problems collection");
    } catch (e) {
        console.error(`Unable to establish connection with Problems: ${e}`);
    }

    try {
        // Change the document to insert different things
        let document = {'name': 'testProblem'};
        await problems.insertOne(document);
        
    } catch (e) {
        console.error(`Unable to insert problem: ${e}`);
        return { error: e };
    }
    console.log('Document has been inserted');
});

