import express from 'express';
import graphHTTP from 'express-graphql';
import passport from 'passport';
import session from 'express-session';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import schema from './schema/index';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);
app.use(logger('dev'));
app.use(cors());
app.use(session({
  secret: 'trialsecret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', graphHTTP(req => ({
  schema,
  graphiql: true,
  context: req,
  customFormatErrorFn: err => ({
    message: err.message,
    customError: err.originalError.customError
  })
})));

app.listen(port, () => {
  logger(`The GraphQL server is running on http://localhost:${port}/api`);
});

export default app;
