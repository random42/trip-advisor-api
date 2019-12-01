import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { router as users } from './users';
import { router as restaurants } from './restaurants';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', users);
app.use('/restaurant', restaurants);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

module.exports = app;
export default app;
