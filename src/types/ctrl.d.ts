import { RequestHandler } from 'express';

interface HttpCtrl {
  [method: string]: RequestHandler;
}
