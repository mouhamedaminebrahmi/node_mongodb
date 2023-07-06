const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.books = require("../src/api/Book/book.model")(mongoose);
db.users = require("../src/api/User/user.model")(mongoose);

module.exports = db;
