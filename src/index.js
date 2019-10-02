import express from 'express';
import graphHTTP from 'express-graphql';
import debug from 'debug';
import dotenv from 'dotenv';

import schema from './schema/index';

dotenv.config();

const app = express();
const logger = debug('log');

app.use('/graphql', graphHTTP({
  schema,
  graphiql: true,
}));

app.listen(8000, () => {
  logger('Server running');
});
