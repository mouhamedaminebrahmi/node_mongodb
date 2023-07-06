const mongoose = require("mongoose");
const db = require("../../../models/index");
const ShemaDb = db.books;
const request = require("supertest");
const app = require("../../../app");
const testQuotes = require("./book.test.data");

describe("unit test for books", () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  beforeEach(async () => {
    for (const testQuote of testQuotes) {
      const newQuote = new ShemaDb({
        title: testQuote.title,
        description: testQuote.description,
        published: testQuote.published,
      });
      await newQuote.save();
    }
  });

  afterEach(async () => {
    await ShemaDb.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const item = {
    title: "testing",
    description: "testing",
    published: true,
  };

  it("post new book", async () => {
    const res = await request(app).post("/books").send(item);
    expect(res.statusCode).toBe(200);
  });
  it("geting all books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
  });
});
