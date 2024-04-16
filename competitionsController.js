import competitionsDAO from "./competitionsDAO.js";

export default class competitionCtrl {
  static async getAllCompetitions(req, res, next) {
    try {
      let competitions = await competitionsDAO.getAllCompetitions();
      console.log("competitionCtrl getAllCompetitions = " + JSON.stringify(competitions))

      if (!competitions) {
        res.status(404).json({error: 'not found'});
        return;
      }

      res.json(competitions);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({error: e});
    }
  }

} 

