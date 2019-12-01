import { HttpCtrl } from '../types';
import { RequestHandler } from 'express';
import { verifyToken } from '../auth';

const debug = require('debug')('@utils:express');

const asyncWrapper = (fn): RequestHandler => (req, res, next) => {
  fn(req, res, next).catch(next);
};

export const asyncController = (ctrl: HttpCtrl): HttpCtrl => {
  const x = {};
  for (const i in ctrl) {
    x[i] = asyncWrapper(ctrl[i]);
  }
  return x;
};

export const authMiddleware: RequestHandler = (req, res, next) => {
  const auth = req.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    res.sendStatus(401);
    return;
  }
  const token = auth.split(' ')[1];
  verifyToken(token)
    .then(userString => {
      res.locals.user = parseInt(userString, 10);
      next();
    })
    .catch(err => {
      res.sendStatus(401);
    });
};
