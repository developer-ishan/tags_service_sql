// Load module
var mysql = require("mysql");
// Initialize pool
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  database: "test",
  user: "root",
  password: "56949201",
  debug: false,
});

// Attempt to catch disconnects
pool.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = pool;
