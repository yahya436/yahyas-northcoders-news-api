const express = require("express");
const app = express();
app.use(express.json())
const endpoints = require("./endpoints.json");
const { api, getApiTopics } = require("./controller");

app.get("api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.get("/api", api)

app.get("/api/topics", getApiTopics)

module.exports = app;
