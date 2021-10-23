const pool = require("../config/mysqlConnector");

exports.filterProducts = (req, res) => {
  const tags_t = JSON.parse(req.query.tags);
  const tags = tags_t.length === 0 ? ["null"] : tags_t;
  console.log(tags);
  pool.query(
    "Select distinct products.id ,products.name, tags.id as tagId, tags.name as tagName \
  from ((productTag \
    INNER JOIN products ON productTag.productId = products.id) \
    INNER JOIN tags ON productTag.tagId = tags.id) \
  where tags.id in (?);",
    [tags],
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

exports.insertTag = (req, res) => {
  const productId = req.params.productId;
  const tagId = req.body.tagId;

  pool.query(
    "INSERT INTO productTag SET ?",
    {
      productId: productId,
      tagId: tagId,
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
exports.removeTag = (req, res) => {
  const productId = req.params.productId;
  const tagId = req.body.tagId;

  pool.query(
    "DELETE FROM productTag WHERE productId = ? AND tagId = ?",
    [productId, tagId],
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
