import mongoose from 'mongoose';

import {STATUSES} from '../utils/http';
import UserModel from '../models/user';

const userHandler = {
  async create(req, res) {
    const {name, email, pwd} = req.body;
    const userInstance = new UserModel({
      name,
      email,
      pwd
    });
    await UserModel.findOne({$or: [
      {email}, {name}
    ]})
    .then((doc) => {
      if (doc) {
        const message = doc.name === name
          ? 'Username already exists'
          : 'Email already exists';
        throw new Error(message);
      } else {
        userInstance.save();
      }
    })
    .then((data) => {
      res
        .status(STATUSES.created)
        .json(data);
    })
    .catch((err) => {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: err.message
      });
    });
  },

  async logIn(req, res) {
    const {username, password} = req.body;
    await UserModel.findOne({$or: [
      {email: username}, {name: username}
    ]})
    .then((doc) => {
      if (doc) return doc.comparePasswords(password);
      else throw Error('User does not exist');
    })
    .then(user => {
      req.session.userId = user._id;
      res.cookie('sid', user._id, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      res
        .status(STATUSES.ok)
        .json({
          name: user.name,
          email: user.email
        });
    })
    .catch((err) => {
      res.status(STATUSES.badRequest).send({
        success: false,
        message: err.message
      });
    });
  },

  async checkIsLoggedIn(req, res, next) {
    await UserModel.findOne({_id: mongoose.Types.ObjectId(req.session.userId)})
    .then(doc => {
      console.log(doc);
      if (doc) next();
      else res.status(STATUSES.unauthorized).send();
    })
    .catch((err) => {
      res.status(STATUSES.badRequest).send({
        success: false,
        message: err.message
      });
    });
  }
};

export default userHandler;
