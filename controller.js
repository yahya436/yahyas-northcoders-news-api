const endpoints = require("./endpoints.json");
const {
  fetchApiTopics,
  fetchApiArticlesById,
  fetchApiArticles,
  fetchApiArticleComments,
  writeComment,
} = require("./model");

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
  const { article_id } = req.params;

  fetchApiArticleComments(article_id)
    .then((articleComments) => {
      res.status(200).send({ articleComments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res
      .status(400)
      .send({ msg: "Invalid request, missing username or body" });
  }

  writeComment(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (!inc_votes) {
    return res.status(400).send({ msg: "Bad request" });
  }

  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(400).send({ msg: "Bad request" });
      }
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);  
}; 


