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
    const {login, pwd} = req.body;
    const isValidLogin = login && (validator.isAlphanumeric(login) || validator.isEmail(login));
    const isValidPwd = pwd;

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
