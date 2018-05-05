import express from 'express';

import {getConfigs} from '../configs';
import {getLogger} from './utils/logger';
import apiRoutes from './routes/api';

/* GLOBAL VARIABLES */
global.__CONFIG__ = getConfigs();
global.__LOGGER__ = getLogger(__CONFIG__.logger.level);

const app = express();

__LOGGER__.info('Starting up API v1 ...');

app.use('/_api', apiRoutes);

app.listen(__CONFIG__.api.port);
__LOGGER__.info(`App listening on port ${__CONFIG__.api.port}`);
