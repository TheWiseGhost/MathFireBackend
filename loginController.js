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
    } catch (error) {
      console.error(error);
      res.status(500).send('Error logging in');
    }
  }

  static async register(req, res) {
    try {
      const { username, password } = req.body;
      await LoginDAO.registerUser(username, password);
      res.status(201).send('User created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user');
    }
  }
}