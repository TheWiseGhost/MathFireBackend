import mongodb from "mongodb";

let competitions;

export default class competitionsDAO {
  static async injectDB(connection) {
    // Is there already a database connection?
    try {
      // Could be multiple collections in the main database
      competitions = await connection.db().collection("Competitions");
      console.log("Connected to Competitions collection");
    } catch (e) {
      console.error(`Unable to establish connection handles in competitionsDAO: ${e}`);
    }
  }

  static async getAllCompetitions() {
    try {
      let cursor = await competitions.find().toArray();
      console.log('getAllCompetitions cursor = ' + cursor);
      return cursor;
    } catch(e) {
      console.log(`Error with getAllCompetitions(): ${e}`);
      return {error: e};
    }
  }
  
}
