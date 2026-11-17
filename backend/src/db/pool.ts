import 'dotenv/config';
import mysql from 'mysql2/promise';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const databasePort = Number(requiredEnv('DB_PORT'));
if (!Number.isInteger(databasePort) || databasePort < 1 || databasePort > 65535) {
  throw new Error('DB_PORT must be an integer between 1 and 65535');
}

if (process.env.DB_PASSWORD === undefined) {
  throw new Error('Missing required environment variable: DB_PASSWORD');
}

export const pool = mysql.createPool({
  host: requiredEnv('DB_HOST'),
  port: databasePort,
  user: requiredEnv('DB_USER'),
  password: process.env.DB_PASSWORD,
  database: requiredEnv('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
