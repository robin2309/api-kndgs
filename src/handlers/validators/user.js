import validator from 'validator';

import {STATUSES} from '../../utils/http';

const userValidator = {
  create: async(req, res, next) => {
    const {name, email, pwd} = req.body;
    const isValidName = name && validator.isAlphanumeric(name);
    const isValidEmail = email && validator.isEmail(email);
    const isValidPwd = pwd;

    if (!isValidName || !isValidEmail || !isValidPwd) {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: 'invalid object'
      });
    } else {
      await next();
    }
  },
  logIn: async(req, res, next) => {
    const {username, password} = req.body;
    const isValidLogin = username && (validator.isAlphanumeric(username) || validator.isEmail(username));
    const isValidPwd = password;

    if (!isValidLogin || !isValidPwd) {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: 'invalid object'
      });
    } else {
      await next();
    }
  }
};

export default userValidator;
