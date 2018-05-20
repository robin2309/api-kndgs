import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import {getConfigs} from '../configs';
import {getLogger} from './utils/logger';
import apiRoutes from './routes/api';
import {connectDB} from './db';

/* GLOBAL VARIABLES */
global.__CONFIG__ = getConfigs();
global.__LOGGER__ = getLogger(global.__CONFIG__.logger.level);

const app = express();

global.__LOGGER__.info('Starting up API v1 ...');

app.use(bodyParser.json());
app.use(session({
  secret: 'monsecret',
  resave: false,
  saveUninitialized: false
}));
app.use(`${global.__CONFIG__.api.prefix}/${global.__CONFIG__.api.version}`, apiRoutes);

app.listen(global.__CONFIG__.api.port, () => {
  global.__LOGGER__.info(`App listening on port ${global.__CONFIG__.api.port}`);

  connectDB().then(
    () => global.__LOGGER__.info(`Connected to mongo`),
    (err) => {
      global.__LOGGER__.error(`${err.message}\n${err.stack}`);
    }
  );
});
