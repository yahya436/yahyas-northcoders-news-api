const endpoints = require("./endpoints.json");
const { fetchApiTopics, fetchApiArticlesById, fetchApiArticles, fetchApiArticleComments } = require("./model");

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

exports.getApiArticles = (req, res, next) => {
  fetchApiArticles()
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getApiArticleComments = (req, res, next) => {
    const { article_id } = req.params

    fetchApiArticleComments(article_id)
    .then((articleComments) => {
        res.status(200).send({ articleComments });
    })
    .catch(next)
}