const endpoints = require("./endpoints.json");
const { fetchApiTopics, fetchApiArticlesById } = require("./model");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints });
};

exports.getApiTopics = (req, res) => {
  fetchApiTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getApiArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchApiArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
