import express from 'express';

import testHandler from '../handlers/test';
import postHandler from '../handlers/post';
import postValidator from '../handlers/validators/post';
import authHandler from '../handlers/auth';
import userValidator from '../handlers/validators/user';

const router = new express.Router();

router
  .route('/test')
  .get(testHandler);

router
  .route('/auth')
  .put(userValidator.create)
  .put(authHandler.create)
  .post(userValidator.logIn)
  .post(authHandler.logIn);

router
  .route('/:postId/upvote')
  .all(authHandler.checkIsLoggedIn)
  .all(postValidator.vote)
  .post(postHandler.upVote);

router
  .route('/:postId/downvote')
  .all(authHandler.checkIsLoggedIn)
  .all(postValidator.vote)
  .post(postHandler.downVote);

router
  .route('/post')
  .all(authHandler.checkIsLoggedIn)
  .put(
    postValidator.create,
    postHandler.create
  );

router
  .route('/posts')
  .get(postHandler.getAll);

export default router;
