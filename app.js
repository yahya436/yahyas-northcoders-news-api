const express = require("express");
const app = express();
app.use(express.json());
// const endpoints = require("./endpoints.json");
const { getApi, getApiTopics, getApiArticlesById, getApiArticles } = require("./controller");

// app.get("/api", (req, res) => {
//   res.status(200).send({ endpoints });
// });

app.get("/api", getApi);

app.get("/api/topics", getApiTopics);

app.get("/api/articles/:article_id", getApiArticlesById);

app.get("/api/articles", getApiArticles)

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

module.exports = app;
