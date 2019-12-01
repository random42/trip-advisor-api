import db from '../db';
import _ from 'lodash';
import { convertToNested } from '../utils';
const debug = require('debug')('@restaurants:crud');

const omitRestaurant = e => _.omit(e, ['restaurant']);
const pickStats = e => _.pick(e, ['avg', 'count']);

export const sample = async (username: string, passwordHash: string) => {
  const sql = `INSERT INTO user(username, password)
VALUES (?,?)
`;
  return db.query({
    sql,
    values: [username, passwordHash]
  });
};

export const getOne = async (id: ID): Promise<Restaurant> => {
  const sql = `WITH feedbacks as (
	SELECT f.restaurant, AVG(f.rating) as avg, COUNT(f.userId) as count
    from restaurant r JOIN feedback f ON r.id = f.restaurant
    GROUP BY r.id
),

opinions as (
	SELECT o.restaurant, AVG(o.rating) as avg, COUNT(o.userId) as count
    from restaurant r JOIN opinion o ON r.id = o.restaurant
    GROUP BY r.id
),

ratings as (
	SELECT ra.restaurant, AVG(ra.rating) as avg, COUNT(ra.userId) as count
    from restaurant r JOIN rating ra ON r.id = ra.restaurant
    GROUP BY r.id
)

SELECT *
FROM
	restaurant r JOIN restaurant_food_need rfn ON r.id = rfn.restaurant
    JOIN opinions o on r.id = o.restaurant
    JOIN ratings ra on r.id = ra.restaurant
    JOIN feedbacks f on r.id = f.restaurant
    JOIN food_need fn on rfn.need = fn.id
    JOIN set_menu sm on r.id = sm.restaurant
    JOIN menu_entry me on r.id = me.restaurant
    JOIN restaurant_image ri on r.id = ri.restaurant
    JOIN restaurant_tag rt on r.id = rt.restaurant
WHERE
	r.id = ?`;
  const rows = await db.query({
    sql,
    values: id,
    nestTables: true
  });
  if (!rows.length) return null;
  const r = convertToNested(rows, ['fn', 'sm', 'me', 'ri', 'rt'], 'r')[0];
  const obj: Restaurant = {
    id: r.r.id,
    name: r.r.name,
    images: r.ri.map(e => e.image),
    avgPrice: r.r.avgPrice,
    maxDiscount: r.r.maxDiscount,
    menu: {
      name: r.r.menuName,
      lastModified: r.r.menuLastModified,
      entries: r.me.map(omitRestaurant)
    },
    setMenus: r.sm.map(omitRestaurant),
    foodNeeds: r.fn.map(e => e.need),
    tags: r.rt.map(e => e.tag),
    ratings: pickStats(r.ra),
    feedbacks: pickStats(r.f),
    opinions: pickStats(r.o)
  };
  return obj;
};

export const getMenus = async (
  id: ID
): Promise<Pick<Restaurant, 'id' | 'menu' | 'setMenus'>> => {
  const sql = `SELECT *
FROM
	restaurant r JOIN set_menu sm on r.id = sm.restaurant
    JOIN menu_entry me on r.id = me.restaurant
WHERE
	r.id = ?`;
  const rows = await db.query({
    sql,
    values: id,
    nestTables: true
  });
  if (!rows.length) return null;
  const r = convertToNested(rows, ['sm', 'me'], 'r')[0];
  const obj = {
    id: r.r.id,
    menu: {
      name: r.r.menuName,
      lastModified: r.r.menuLastModified,
      entries: r.me.map(omitRestaurant)
    },
    setMenus: r.sm.map(omitRestaurant)
  };
  return obj;
};

export const getRatings = async (
  id: ID,
  offset: number,
  limit: number
): Promise<Rating[]> => {
  const sql = `SELECT ra.id, ra.rating, u.id, u.username
FROM
	restaurant r JOIN rating ra on r.id = ra.restaurant
  JOIN user u on ra.userId = u.id
WHERE
	r.id = ?
LIMIT ?
OFFSET ?
`;
  const rows = await db.query({
    sql,
    values: [id, limit, offset],
    nestTables: true
  });
  return rows.map(x => {
    return {
      id: x.ra.id,
      user: x.u,
      rating: x.ra.rating
    };
  });
};

export const getFeedbacks = async (
  id: ID,
  offset: number,
  limit: number
): Promise<Feedback[]> => {
  const sql = `SELECT f.id, f.rating, u.id, u.username
FROM
	restaurant r JOIN feedback f on r.id = f.restaurant
  JOIN user u on f.userId = u.id
WHERE
	r.id = ?
LIMIT ?
OFFSET ?
`;
  const rows = await db.query({
    sql,
    values: [id, limit, offset],
    nestTables: true
  });
  return rows.map(x => {
    return {
      id: x.f.id,
      user: x.u,
      rating: x.f.rating
    };
  });
};

export const getOpinions = async (
  id: ID,
  offset: number,
  limit: number
): Promise<Opinion[]> => {
  const sql = `SELECT o.id, o.rating, o.opinion, u.id, u.username
FROM
	restaurant r JOIN opinion o on r.id = o.restaurant
  JOIN user u on o.userId = u.id
WHERE
	r.id = ?
LIMIT ?
OFFSET ?
`;
  const rows = await db.query({
    sql,
    values: [id, limit, offset],
    nestTables: true
  });
  return rows.map(x => {
    return {
      id: x.o.id,
      user: x.u,
      rating: x.o.rating,
      opinion: x.o.opinion
    };
  });
};

export const search = async (
  query: string,
  offset: number,
  limit: number
): Promise<Pick<Restaurant, 'id' | 'name'>> => {
  const queryString = '%' + query.toLowerCase() + '%';
  const sql = `SELECT id, name
FROM
	restaurant
WHERE
	LOWER(name) LIKE ?
LIMIT ?
OFFSET ?`;
  return db.query({
    sql,
    values: [queryString, limit, offset]
  });
};

export const insertOpinion = async (
  id: ID,
  user: ID,
  rating: number,
  opinion: string
): Promise<ID> => {
  const sql = `INSERT INTO opinion (restaurant,userId,rating,opinion)
VALUES (?,?,?,?);`;
  const result = await db.query({
    sql,
    values: [id, user, rating, opinion]
  });
  return result.insertId;
};

export const book = async (id: ID, user: ID): Promise<ID> => {
  const sql = `INSERT INTO restaurant_booking (restaurant,userId)
VALUES (?,?);`;
  const result = await db.query({
    sql,
    values: [id, user]
  });
  return result.insertId;
};
