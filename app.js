const express = require("express");
const app = express();
app.use(express.json());
const { getApi, getApiTopics, getApiArticlesById, getApiArticles, getApiArticleComments } = require("./controller");

// =====================================================================

app.get("/api", getApi);

app.get("/api/topics", getApiTopics);

app.get("/api/articles/:article_id", getApiArticlesById);

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: "Internal server error" });
  }
});

app.get("/api/articles", getApiArticles)

app.get("/api/articles/:article_id/comments", getApiArticleComments);

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;
