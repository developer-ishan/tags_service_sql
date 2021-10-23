const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "test",
  user: "root",
  password: "56949201",
});

// Trying to connect to database
conn.connect((err) => {
  if (err) console.log("Database connection Error!");
  else console.log("Database connection success!");
});

conn.query(
  "CREATE TABLE IF NOT EXISTS tags (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    name VARCHAR(255)\
    )",
  (err, result) => {
    if (err) throw err;
    console.log("tags table created sucessfully!");
  }
);

conn.query(
  "CREATE TABLE IF NOT EXISTS products (\
    id INT AUTO_INCREMENT PRIMARY KEY, \
    name VARCHAR(255)\
    )",
  (err, result) => {
    if (err) throw err;
    console.log("tags table created sucessfully!");
  }
);

conn.query(
  "CREATE TABLE IF NOT EXISTS productTag (\
    productId INT NOT NULL, \
    tagId INT NOT NULL, \
    FOREIGN KEY (productId) REFERENCES products(id), \
    FOREIGN KEY (tagId) REFERENCES tags(id), \
    CONSTRAINT U_productTag UNIQUE (productId,tagId)\
    )",
  (err, result) => {
    if (err) throw err;
    console.log("productTag table created sucessfully!");
  }
);
