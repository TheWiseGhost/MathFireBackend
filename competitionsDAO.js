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
  
  static async getCompetition(id) {
    try {
      console.log(id);
      let cursor = await competitions.findOne({_competitionId: id});
      console.log('cursor = ' + cursor);
      return cursor;
      // CURSOR IS NULL FOR SOME REASON
    } catch(e) {
      console.log(`Error with getCompetition(): ${e}`);
      return {error: e};
    }
  }

  static async insertScore(id, user, score) {
    try {
      // Find the competition document by its _competitionId
      const competition = await competitions.findOne({ _competitionId: id });
  
      if (!competition) {
        console.log(`Competition with ID ${id} not found.`);
        return;
      }
  
      // Determine the position to insert the new score and user
      let insertIndex = competition.leaderboard_scores.findIndex((existingScore) => score > existingScore);
  
      if (insertIndex === -1) {
        // If score is not greater than any existing scores, insert at the end
        insertIndex = competition.leaderboard_scores.length;
      }
  
      // Update the competition document with the new score and user
      await competitions.updateOne(
        { _competitionId: id },
        {
          $push: {
            leaderboard_scores: {
              $each: [score],
              $position: insertIndex
            },
            leaderboard_names: {
              $each: [user],
              $position: insertIndex
            }
          }
        }
      );
  
      console.log(`Score ${score} inserted for user ${user} in competition ${id}`);
    } catch (e) {
      console.log(`Error with insertScore(): ${e}`);
    }
  }
  
}
