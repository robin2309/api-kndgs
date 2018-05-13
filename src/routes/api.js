import express from 'express';

import testHandler from '../handlers/test';
import postHandler from '../handlers/post';
import postValidator from '../handlers/validators/post';
import authHandler from '../handlers/auth';

const router = new express.Router();

router
  .route('/test')
  .get(testHandler);

router
  .route('/auth')
  .put(authHandler.create)
  .post(authHandler.logIn);

router
  .route('/post')
  .put(
    postValidator.create,
    postHandler.create
  );

export default router;
