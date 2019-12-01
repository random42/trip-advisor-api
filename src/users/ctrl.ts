import { HttpCtrl } from '../types';
import { asyncController } from '../utils';
import * as db from './crud';
import * as auth from '../auth';
const debug = require('debug')('@users:ctrl');

export const ctrl: HttpCtrl = asyncController({
  register: async (req, res, next) => {
    const { username, password } = req.body;
    const hash = await auth.hash(password);
    try {
      await db.create(username, hash);
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send('Username already taken');
    }
  },

  login: async (req, res, next) => {
    const { username, password } = req.body;
    const user = await db.getByUsername(username);
    if (!user) {
      // user does not exist
      res.sendStatus(400);
      return;
    }
    const correct = await auth.compareHash(password, user.password);
    if (correct) {
      // send token back
      const token = await auth.signToken(`${user.id}`);
      res.status(200).json({ user: user.id, token });
    } else res.sendStatus(401);
  },

  addToFavourites: async (req, res, next) => {
    const { user } = res.locals;
    const { restaurant } = req.body;
    await db.addToFavourites(user, restaurant);
    res.sendStatus(200);
  },

  removefromFavourites: async (req, res, next) => {
    const { user } = res.locals;
    const { restaurant } = req.body;
    await db.removefromFavourites(user, restaurant);
    res.sendStatus(200);
  }
});
