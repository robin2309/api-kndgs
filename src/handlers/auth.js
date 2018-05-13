import {STATUSES} from '../utils/http';
import UserModel from '../models/user';

const userHandler = {
  async create(req, res) {
    try {
      const {name, email, pwd} = req.body;
      const userInstance = new UserModel({
        name,
        email,
        pwd
      });
      await userInstance.save()
        .then((data) => {
          res
            .status(STATUSES.created)
            .json(data);
        })
        .catch((err) => {
          res.status(STATUSES.internalError).send({
            success: false,
            message: err.message
          });
        });
    } catch (e) {
      global.__LOGGER__.error('Create user error: ', e);
      res.status(STATUSES.internalError).send({
        message: e.message,
        success: false
      });
    }
  },

  async logIn(req, res) {
    try {
      const {login, pwd} = req.body;
      await UserModel.findOne({$or: [
        {email: login}, {name: login}
      ]})
      .then((doc) => {
        console.log(doc);
        return doc.comparePasswords(pwd);
      })
      .then(user => {
        res
          .status(STATUSES.ok)
          .json(user);
      })
      .catch((err) => {
        res.status(STATUSES.badRequest).send({
          success: false,
          message: err.message
        });
      });
    } catch (e) {
      global.__LOGGER__.error('Create user error: ', e);
      res.status(STATUSES.internalError).send({
        message: e.message,
        success: false
      });
    }
  }
};

export default userHandler;
