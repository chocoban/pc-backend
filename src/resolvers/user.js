import models from '../../db/models/Users';

class User {
  static async postUser() {
    const user = await models.User.create({});

    return user;
  }

  static async getAllUsers() {
    const users = await models.User.findAll();
    return users;
  }

  static async getSingleUser(id) {
    const userId = id;
    const user = await models.User.findOne({
      where: {
        id: userId
      }
    });
    return user;
  }

  static async updateUser(req, res) {
    const userId = req.params.id;
    const user = await models.User.findOne({
      where: {
        id: userId
      }
    });
    return res.statusCode(200)
      .json({ data: user });
  }
}

module.exports = User;
