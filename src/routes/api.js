import express from 'express';

import testHandler from '../handlers/test';
import postHandler from '../handlers/post';
import postValidator from '../handlers/validators/post';

const router = new express.Router();

router
  .route('/test')
  .get(testHandler);

router
  .route('/post')
  .put(
    postValidator.create,
    postHandler.create
  );

export default router;
