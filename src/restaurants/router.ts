import { Router } from 'express';
import { ctrl } from './ctrl';
import { authMiddleware } from '../utils';

export const router: Router = Router();

router.use(authMiddleware);

router.get('/', ctrl.getOne);

router.get('/menu', ctrl.getMenus);

router.get('/feedback', ctrl.getFeedbacks);

router.get('/rating', ctrl.getRatings);

router.get('/opinion', ctrl.getOpinions);

router.get('/search', ctrl.search);

router.post('/book', ctrl.book);

router.post('/opinion', ctrl.insertOpinion);
