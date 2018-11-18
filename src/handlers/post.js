import PostModel from '../models/post';
import {STATUSES} from '../utils/http';

const postHandler = {
  create: async(req, res) => {
    const {link, title, desc} = req.body;
    const postInstance = new PostModel({
      link,
      title,
      desc,
      author: req.session.userId
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
  },

  getAll: async(req, res) => {
    await PostModel.find({}, null, {sort: {'createdAt': 1}})
    .then((data) => {
      res.status(STATUSES.ok)
      .json(
        data.map(doc => doc.toJSON())
      );
    })
    .catch(err => {
      console.log(err);
      res.status(STATUSES.internalError).send({
        success: false,
        message: err.message
      });
    });
  },

  upVote: async(req, res) => {
    const {postId} = req.params;
    // TODO check if already voted
    await PostModel.findOne({_id: postId})
    .then(async doc => {
      if (!doc) throw new Error('Unknown post');
      console.log(doc);
      doc.upVote();
      return doc.save();
    })
    .then(data => {
      res.status(STATUSES.created)
      .json(data);
    })
    .catch(err => {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: err.message
      });
    });
  },

  downVote: async(req, res) => {
    const {postId} = req.params;
    // TODO check if already voted
    await PostModel.findOne({_id: postId})
    .then(async doc => {
      if (!doc) throw new Error('Unknown post');
      doc.downVote();
      return doc.save();
    })
    .then(data => {
      res.status(STATUSES.created)
      .json(data);
    })
    .catch(err => {
      res.status(STATUSES.unprocessEntity).send({
        success: false,
        message: err.message
      });
    });
  }
};

export default postHandler;
