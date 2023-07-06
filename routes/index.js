var express = require("express");
var router = express.Router();
var path = require("path");

require("../src/api/Book/book.routes")(router);
require("../src/api/User/user.routes")(router);

module.exports = router;
