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
      return rows[0];
    });
};

exports.fetchApiArticles = () => {
  return db.query(`
        SELECT articles.article_id, articles.title, articles.topic, articles.author,
        articles.created_at, articles.votes, articles.article_img_url,
        CAST(COUNT(comments.comment_id) AS INT) AS comment_count
      FROM articles
      LEFT JOIN comments
      ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
      `).then(({ rows }) => {
        return rows
      })
};

/* Responds with:

an articles array of article objects, each of which should have the following properties:
author
title
article_id
topic
created_at
votes
article_img_url
comment_count, which is the total count of all the comments with this article_id. You should make use of queries to the database in order to achieve this. */
