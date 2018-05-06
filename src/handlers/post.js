import PostModel from '../models/post';
import {STATUSES} from '../utils/http';

const postHandler = {
  create: async(req, res) => {
    try {
      const {link, title, desc} = req.body;
      const postInstance = new PostModel({
        link,
        title,
        desc
      });
      await postInstance.save()
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
      global.__LOGGER__.error('Handler post error: ', e);
      res.status(STATUSES.internalError).send({
        message: e.message,
        success: false
      });
    }
  }
};

export default postHandler;
