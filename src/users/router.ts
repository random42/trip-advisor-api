import { Router } from 'express';
import { ctrl } from './ctrl';
import { authMiddleware } from '../utils';

export const router: Router = Router();

const NO_AUTH = ['/login', '/register'];

router.use((req, res, next) => {
  const noAuth = NO_AUTH.some(route => req.path.endsWith(route));
  if (noAuth) next();
  else authMiddleware(req, res, next);
});

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.post('/favourite', ctrl.addToFavourites);

router.delete('/favourite', ctrl.removefromFavourites);
