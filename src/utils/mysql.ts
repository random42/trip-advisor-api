import _ from 'lodash';

/**
 * Expects a list of mysql rows with option nestTables: true
 * Expects each array table and the parent table to have an 'id' field.
 * Only supports one dimensional arrays.
 *
 * @return An array of objects that have the same fields of a row and are uniquely
 * identified by the id of the parent table and with 'arrayTables' fields as arrays
 */
export function convertToNested(
  rows: any[],
  arrayTables: string[],
  parentTable: string
): any[] {
  if (rows.length === 0) return null;
  const tables = Object.keys(rows[0]);
  const nonArrayTables = _.difference(tables, arrayTables);
  const x = {};
  for (const row of rows) {
    const objId = row[parentTable].id;
    // initialize if necessary
    if (!x[objId]) {
      x[objId] = {};
      for (const t of nonArrayTables) {
        x[objId][t] = row[t];
      }
    }
    const obj = x[objId];
    for (const t of arrayTables) {
      // initialize if necessary
      obj[t] = obj[t] || {};
      obj[t][row[t].id] = row[t];
    }
  }
  // transform objects to arrays;
  const result = Object.values(x);
  result.forEach(obj => {
    for (const t of arrayTables) {
      obj[t] = Object.values(obj[t]);
    }
  });
  return result;
}
