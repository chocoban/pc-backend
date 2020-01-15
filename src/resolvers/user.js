import dotenv from 'dotenv';
import models from '../../db/models';
import { generateToken } from '../utils/authUtils';

dotenv.config();

class User {
  static async postUser(googleData) {
    const {
      email, name
    } = googleData;
    let user;
    try {
      user = await models.User.findOne({ where: { email } });
      if (!user) {
        user = await models.User.create({ email, name });
      }
      const loggedInUser = {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      };
      const token = generateToken(user);
      const currentUser = {
        user: loggedInUser,
        token
      };
      return currentUser;
    } catch (err) { return err; }
  }

  static async getAllUsers() {
    const users = await models.User.findAll({});
    return users;
  }

  static async getSingleUser(id) {
    const user = await models.User.findOne({ where: { id } });
    return user;
  }

  static async updateUser(req, res) {
    const userId = req.params.id;
    const user = await models.User.findOne({ where: { id: userId } });
    return res.statusCode(200)
      .json({ data: user });
  }
}

export default User;
