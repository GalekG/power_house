import * as mysql from 'mysql2/promise';
import { DATABASE_CONFIG } from '../../../../config/consts';
import { formatArray } from '../../utils/formatResponse';
import { formatDataToInsert } from '../../utils/formatData.sql';

const connectionConfig = {
  host: DATABASE_CONFIG.host,
  user: DATABASE_CONFIG.user,
  password: DATABASE_CONFIG.password,
  port: DATABASE_CONFIG.port,
  database: DATABASE_CONFIG.name,
};

let connection: mysql.Connection;

async function connect() {
  connection = await mysql.createConnection(connectionConfig);
  return connection;
}

connect();

async function executeQuery<T>(query: string, params: any[] = []): Promise<T[]> {
  const [rows] = await connection.query(query, params);
  return rows as T[];
}

const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP()';

async function insertRecord(table: string, data): Promise<number> {
  const { insert, params } = formatDataToInsert(data);
  const sql = `Insert Into ${table} SET ${insert}, createdAt = ${CURRENT_TIMESTAMP}`;

  try {
    const result = await connection.query(sql, params);
    return JSON.parse(JSON.stringify(result))[0].insertId;
  } catch (e) {
    throw new Error(e);
  }
}

async function updateRecord(table: string, data, id: number): Promise<number> {
  const { insert, params } = formatDataToInsert(data);
  params.push(id);
  const sql = `UPDATE ${table} SET ${insert}, updatedAt = ${CURRENT_TIMESTAMP} WHERE id = ?`;

  try {
    await connection.query(sql, params);
    return id;
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteRecord(table: string, id: number): Promise<number> {
  const sql = `DELETE FROM ${table} WHERE id = ?`;
  try {
    await connection.query(sql, [id]);
    return id;
  } catch (e) {
    throw new Error(e);
  }
}

async function getAllFromTable<T>(table: string): Promise<T[]> {
  const sql = `SELECT * FROM ${table}`;
  const [rows] = await connection.query(sql);

  return rows && (rows as T[]).length ? formatArray(rows as T[]) as T[] : [];
}

async function findMany<T>(sql: string, params: any[] = []): Promise<T[]> {
  const [rows] = await connection.query(sql, params);

  return rows && (rows as T[]).length ? formatArray(rows) as T[] : [];
}

async function getFirst<T>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await connection.query(sql, params);

  const [first] = JSON.parse(JSON.stringify(rows));

  return first ? first as T : null;
}

async function findOne<T>(table: string, id: number): Promise<T> {
  const sql = `SELECT * FROM ${table} WHERE id = ?`;

  const [rows] = await connection.query(sql, [id]);

  const [first] = JSON.parse(JSON.stringify(rows));

  return first ? first as T : null;
}

export {
  executeQuery,
  insertRecord,
  updateRecord,
  deleteRecord,
  getAllFromTable,
  findMany,
  getFirst,
  findOne,
};
