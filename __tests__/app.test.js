const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
require("jest-sorted");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpointsJson);
      });
  });
});

describe("/api/topics", () => {
  test("GET /api/topics - responds with status 200 and an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach(({ description, slug }) => {
          expect(typeof description).toBe("string");
          expect(typeof slug).toBe("string");
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an object of the article with the correct article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article).toBe("object");
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("200: Responds with an object of the article with the 4th article id", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article).toBe("object");
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
  test("200: Responds with an object of the article with the 13th article id", () => {
    return request(app)
      .get("/api/articles/13")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(typeof article).toBe("object");
        expect(typeof article.article_id).toBe("number");
        expect(typeof article.title).toBe("string");
        expect(typeof article.topic).toBe("string");
        expect(typeof article.author).toBe("string");
        expect(typeof article.body).toBe("string");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(typeof article.article_img_url).toBe("string");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects with the correct properties and sorted by date (descending)", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveLength(13);

        body.article.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
        expect(body.article).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("404: Responds with an error if the endpoint is incorrect", () => {
    return request(app)
      .get("/api/bananana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not found");
      });
  });
});
