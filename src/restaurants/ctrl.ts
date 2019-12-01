import { HttpCtrl } from '../types';
import { asyncController } from '../utils';
import * as db from './crud';
import * as auth from '../auth';
const debug = require('debug')('@restaurants:ctrl');

const PAGE_RESULTS = 50;

export const ctrl = asyncController({
  getOne: async (req, res, next) => {
    const { id } = req.query;
    const r = await db.getOne(id);
    r ? res.status(200).json(r) : res.sendStatus(400);
  },

  getMenus: async (req, res, next) => {
    const { id, page } = req.query;
    const pageNum = parseInt(page, 10);
    const r = await db.getMenus(id);
    r ? res.status(200).json(r) : res.sendStatus(400);
  },

  getRatings: async (req, res, next) => {
    const { id, page } = req.query;
    const pageNum = parseInt(page, 10);
    const r = await db.getRatings(id, pageNum * PAGE_RESULTS, PAGE_RESULTS);
    res.status(200).json(r);
  },

  getFeedbacks: async (req, res, next) => {
    const { id, page } = req.query;
    const pageNum = parseInt(page, 10);
    const r = await db.getFeedbacks(id, pageNum * PAGE_RESULTS, PAGE_RESULTS);
    res.status(200).json(r);
  },

  getOpinions: async (req, res, next) => {
    const { id, page } = req.query;
    const pageNum = parseInt(page, 10);
    const r = await db.getOpinions(id, pageNum * PAGE_RESULTS, PAGE_RESULTS);
    res.status(200).json(r);
  },

  search: async (req, res, next) => {
    const { query, page } = req.query;
    const pageNum = parseInt(page, 10);
    const r = await db.search(query, pageNum * PAGE_RESULTS, PAGE_RESULTS);
    res.status(200).json(r);
  },

  insertOpinion: async (req, res, next) => {
    const { user } = res.locals;
    const { id } = req.query;
    const { rating, opinion } = req.body;
    await db.insertOpinion(id, user, parseInt(rating, 10), opinion);
    res.sendStatus(200);
  },

  book: async (req, res, next) => {
    const { user } = res.locals;
    const { id } = req.query;
    await db.book(id, user);
    res.sendStatus(200);
  }
});
