const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "usuario",
  password: "contrasenia",
  database: "ecommerce",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
