const pool = require("../config/mysqlConnector");

exports.getProucts = (req, res) => {
  pool.query(
    "Select products.name as productName, tags.name as tagName, tags.id as tagId, products.id as id \
  from ((productTag \
    RIGHT JOIN products ON productTag.productId = products.id) \
    LEFT JOIN tags ON productTag.tagId = tags.id) ;",
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      const products = {};
      dbres.forEach((row) => {
        if (products[row.id]) {
          products[row.id].tags.push({
            id: row.tagId,
            name: row.tagName,
          });
        } else {
          products[row.id] = {
            id: row.id,
            name: row.productName,
            tags: [],
          };
          if (row.tagId) {
            products[row.id].tags.push({
              id: row.tagId,
              name: row.tagName,
            });
          }
        }
      });
      res.json(products);
    }
  );
};
exports.getProuct = (req, res) => {
  pool.query(
    "Select products.name as productName, tags.name as tagName, tags.id as tagId, products.id as id \
    from ((productTag \
      RIGHT JOIN products ON productTag.productId = products.id) \
      LEFT JOIN tags ON productTag.tagId = tags.id) \
    where products.id = ?;",
    [req.params.id],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      if (!dbres[0]) return res.json(dbres);
      const productName = dbres[0].productName;
      const id = dbres[0].id;
      const tags = dbres[0].tagId
        ? dbres.map((row) => {
            return {
              id: row.tagId,
              name: row.tagName,
            };
          })
        : [];
      const product = {
        id: id,
        productName: productName,
        tags: tags,
      };
      console.table(product);
      return res.json(product);
    }
  );
};
exports.createProuct = (req, res) => {
  pool.query(
    "INSERT INTO products SET ?",
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
exports.editProuct = (req, res) => {
  pool.query(
    "Select * from products where id = ?;",
    [req.params.id],
    (err, dbres) => {
      if (err) {
        console.log(err);
        return res.end(500);
      }
      console.table(dbres);

      pool.query(
        "UPDATE products SET ? where id = ?",
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
exports.deleteProuct = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.end(500);
    }
    connection.query(
      "DELETE FROM products WHERE id = ?",
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
