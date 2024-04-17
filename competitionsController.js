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

  static async getCompetition(req, res) {
    try {
      let id = req.params.id || {};
      console.log(id)
      let competition = await competitionsDAO.getCompetition(id);
      console.log("CompetitionCtrl competition = " + JSON.stringify(competition))

      if (!problem){
        res.status(404).json({error: "Not found"});
        return;
      }
      res.json(problem);
    } catch (e) {
      console.log(`GetCompetition: ${e}`);
      res.status(500).json({error: e});
    }
  }

} 

