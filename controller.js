const endpoints = require("./endpoints.json");
const { fetchApiTopics } = require("./model");

exports.api = (req, res) => {
  res.status(200).send({ endpoints });
};

exports.getApiTopics = (req, res) => {
    console.log("Getting topics")
  fetchApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};
