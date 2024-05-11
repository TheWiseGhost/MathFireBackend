import express from "express";
import problemCtrl from "./problemsController.js";
import loginCtrl from "./loginController.js";
import competitionCtrl from "./competitionsController.js";

const router = express.Router();

router.route('/challenges/:id').get(problemCtrl.getProblem);
router.route('/action/getting_problems/:type').get(problemCtrl.getAllProblems);
// router.route('/sort/:type').get(problemCtrl.getProblemsByType)

router.route('/action/login').post(loginCtrl.login);
router.route('/action/register').post(loginCtrl.register);

router.route('/competitions_search').get(competitionCtrl.getAllCompetitions);
router.route('/competition/:id').get(competitionCtrl.getCompetition);
router.route('/competition/upload/:id').post(competitionCtrl.insertScore);

router.route('/').get((req, res) => res.send('hello world'));

export default router;
