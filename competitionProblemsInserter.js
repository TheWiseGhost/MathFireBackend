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
let competitionProblems;

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
        competitionProblems = await client.db().collection("Competitions");
        console.log("Connected to Competitions collection");
    } catch (e) {
        console.error(`Unable to establish connection with competitionProblems: ${e}`);
    }

    try {
        // Change the document to insert different things
        let document = {'name': 'testCompetition'};
        await competitionProblems.insertOne(document);
        
    } catch (e) {
        console.error(`Unable to insert competition problem: ${e}`);
        return { error: e };
    }
    console.log('Document has been inserted');
});

