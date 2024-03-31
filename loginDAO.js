import bcrypt from 'bcrypt';

let users;

export default class loginDAO {
  static async injectDB(connection) {
    try {
      users = await connection.db().collection("MathFireUserAuth");
      console.log("Connected to MathFireUserAuth collection");
    } catch (e) {
      console.error(`Unable to establish connection handles in LoginDAO: ${e}`);
    }
  }

  static async loginUser(username, password) {
    try {
      const user = await users.findOne({ username });
      if (!user) {
        return { error: 'User not found' };
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return { error: 'Invalid password' };
      }
      return { user };
    } catch (e) {
      console.error(`Unable to login user: ${e}`);
      return { error: e };
    }
  }

  static async registerUser(username, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await users.insertOne({ username, password: hashedPassword });
    } catch (e) {
      console.error(`Unable to register user: ${e}`);
      return { error: e };
    }
  }
}