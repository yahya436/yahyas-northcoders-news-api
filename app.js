const express = require("express");
const app = express();
app.use(express.json())
// const endpoints = require("./endpoints.json");
const { getApi, getApiTopics, getApiArticlesById } = require("./controller");

// app.get("/api", (req, res) => {
//   res.status(200).send({ endpoints });
// });

app.get("/api", getApi)

app.get("/api/topics", getApiTopics)

app.get("/api/articles/:article_id", getApiArticlesById);

module.exports = app;
