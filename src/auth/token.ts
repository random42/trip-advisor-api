import jwt from 'jsonwebtoken';
const JWT = require('../../secret/jwt.json');
const KEY = JWT.key;

const expiresIn = '1h';

export async function signToken(payload: string): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(payload, KEY, (err, token) => {
      if (err) rej(err);
      else res(token);
    });
  });
}

export async function verifyToken(token: string): Promise<string> {
  return new Promise((res, rej) => {
    jwt.verify(token, KEY, (err, decoded) => {
      if (err) rej(err);
      else res(decoded);
    });
  });
}
