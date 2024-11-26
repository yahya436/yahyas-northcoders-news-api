const db = require("./db/connection");

exports.fetchApiTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchApiArticlesById = (article_id) => {
  return db
    .query(
      `SELECT * FROM articles
         WHERE article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article doesn't exist" });
      }
      console.log(rows, "rows from articles table");
      return rows[0];
    });
};
