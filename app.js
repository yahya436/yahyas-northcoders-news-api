const express = require("express");
const app = express();
const endpoints = require("./endpoints.json");
// const { api , getApiTopics } = require("./controller")

app.get("/api", (req, res) => {
  console.log("inside app")
  res.status(200).send({ endpoints });
});



module.exports = app;
