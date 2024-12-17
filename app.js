const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
const {
  getApi,
  getApiTopics,
  getApiArticlesById,
  getApiArticles,
  getApiArticleComments,
  postComment,
  updateArticleVotes,
  patchArticle,
} = require("./controller");
const { patchVotes } = require("./model");

// =====================================================================

app.use(cors());

app.get("/api", getApi);

app.get("/api/topics", getApiTopics);

app.get("/api/articles/:article_id", getApiArticlesById);

app.get("/api/articles", getApiArticles);

app.get("/api/articles/:article_id/comments", getApiArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

// ------------------------------------------------------------------


app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});




module.exports = app;
