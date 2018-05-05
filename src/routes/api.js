import express from 'express';

import testHandler from '../handlers/test';
import postHandler from '../handlers/post';

const router = new express.Router();

router
  .route('/test')
  .get(testHandler);

router
  .route('/post')
  .put(postHandler);

export default router;
