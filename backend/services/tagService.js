const pool = require("../config/mysqlConnector");

exports.getTags = (req, res) => {
  pool.query("Select * from tags;", (err, dbres) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    console.table(dbres);
    return res.json(dbres);
  });
};
exports.getTag = (req, res) => {
  pool.query(
    "Select * from tags where id = ?;",
    [req.params.id],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      console.table(dbres);
      return res.json(dbres);
    }
  );
};
exports.createTag = (req, res) => {
  pool.query(
    "INSERT INTO tags SET ?",
    {
      name: req.body.name,
    },
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.table(dbres);
      res.json(dbres);
    }
  );
};
exports.searchTag = (req, res) => {
  if (!req.query.s) return res.json([]);
  const f = JSON.parse(req.query.f);
  let tags = [];
  if (f.length === 0) tags = ["null"];
  else tags = f;

  pool.query(
    "SELECT * from tags where name like ? AND name NOT IN (?);",
    ["%" + req.query.s + "%", tags],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      res.json(dbres);
    }
  );
};
exports.editTag = (req, res) => {
  pool.query(
    "Select * from tags where id = ?;",
    [req.params.id],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      console.table(dbres);

      pool.query(
        "UPDATE tags SET ? where id = ?",
        [
          {
            name: req.body.name ? req.body.name : dbres[0].name,
          },
          req.params.id,
        ],
        (err, dbres) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          }
          console.table(dbres);
          res.json(dbres);
        }
      );
    }
  );
};
exports.deleteTag = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query(
      "DELETE FROM tags WHERE id = ?",
      [req.params.id],
      (err, dbres) => {
        if (err) {
          console.log(err);
          return res.end(400);
        }

        console.table(dbres);
        res.json(dbres);
      }
    );
  });
};
