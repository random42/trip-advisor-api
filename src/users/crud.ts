import db from '../db';
const debug = require('debug')('@users:crud');

export const create = async (username: string, passwordHash: string) => {
  const sql = `INSERT INTO user(username, password)
VALUES (?,?)
`;
  return db.query({
    sql,
    values: [username, passwordHash]
  });
};

export const getByUsername = async (username: string): Promise<User> => {
  const sql = `SELECT * FROM user WHERE username=?`;
  return db.queryOne({
    sql,
    values: username
  });
};

export const addToFavourites = async (user: ID, restaurant: ID) => {
  const sql = `INSERT INTO user_favourite(userId,restaurant)
  VALUES (?,?);`;
  return db.query({
    sql,
    values: [user, restaurant]
  });
};

export const removefromFavourites = async (user: ID, restaurant: ID) => {
  const sql = `DELETE from user_favourite
  WHERE
    userId = ? AND
    restaurant = ?
  ;`;
  return db.query({
    sql,
    values: [user, restaurant]
  });
};
