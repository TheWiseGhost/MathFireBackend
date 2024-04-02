import express from "express";
import problemCtrl from "./problemsController.js";
import loginCtrl from "./loginController.js";

const router = express.Router();

router.route('/challenges/:id').get(problemCtrl.getProblem);
router.route('/action/getting_problems').get(problemCtrl.getAllProblems);
// router.route('/sort/:type').get(problemCtrl.getProblemsByType)

router.route('/action/login').post(loginCtrl.login);
router.route('/action/register').post(loginCtrl.register);

router.route('/').get((req, res) => res.send('hello world'));

export default router;
