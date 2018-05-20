import validator from 'validator';

import {STATUSES} from '../../utils/http';

const postValidator = {
  create: async(req, res, next) => {
    const {link, title, desc} = req.body;
    const isValidLink = link && validator.isURL(link, {protocols: ['http', 'https']});
    const isValidTitle = title && validator.isAlphanumeric(validator.blacklist(title, ' '));
    const isValidDesc = !desc || validator.isAlphanumeric(validator.blacklist(desc, ' '));

    if (!isValidLink || !isValidTitle || !isValidDesc) {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: 'invalid object'
      });
    } else {
      await next();
    }
  },
  vote: async(req, res, next) => {
    const {postId} = req.params;
    const isValidPostId = postId && validator.isAlphanumeric(postId);
    if (!isValidPostId) {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: 'invalid post id'
      });
    } else {
      await next();
    }
  }
};

export default postValidator;
