import mysql from 'mysql';
import util from 'util';
const DB = require('../../secret/db.json');

const connection = mysql.createConnection({
  host: DB.host,
  user: DB.user,
  password: DB.password,
  port: DB.port,
  multipleStatements: true // for scripts
});

export const db = {
  connect: util.promisify(connection.connect.bind(connection)),
  query: util.promisify(connection.query.bind(connection)),
  beginTransaction: util.promisify(
    connection.beginTransaction.bind(connection)
  ),
  commit: util.promisify(connection.commit.bind(connection)),
  rollback: util.promisify(connection.rollback.bind(connection)),
  end: util.promisify(connection.end.bind(connection)),
  destroy: util.promisify(connection.destroy.bind(connection)),
  format: connection.format.bind(connection),
  async useDb() {
    return this.query(`USE ${DB.database};`);
  },
  async queryOne(...args) {
    const results = await this.query(...args);
    if (results.length) {
      return results[0];
    } else return undefined;
  }
};

export default db;
