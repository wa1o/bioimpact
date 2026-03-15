import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host:     process.env.DB_HOST     ?? "sql5.freesqldatabase.com",
  user:     process.env.DB_USER     ?? "sql5819687",
  password: process.env.DB_PASSWORD ?? "dM4Vw2ZjMc",
  database: process.env.DB_NAME     ?? "sql5819687",
  waitForConnections: true,
  connectionLimit: 10,
});