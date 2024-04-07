import loginDAO from "./loginDAO.js";

export default class loginCtrl {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const { user, error } = await loginDAO.loginUser(username, password);
      if (error) {
        res.status(401).json({ error });
      } else {
        res.json({ message: 'Login successful', user });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({error: e});
    }
  }

  static async register(req, res) {
    try {
      const { username, password } = req.body;
      await loginDAO.registerUser(username, password);
    } catch (e) {
      console.error(e);
      res.status(500).json({error: e});
    }
  }
}