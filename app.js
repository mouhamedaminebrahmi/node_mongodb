const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/index");

// const { graphqlHTTP } = require("express-graphql");
const schema = require("./src/api/v2/shema/index");
var cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.append("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});

// you can access image
app.use("/uploads", express.static(__dirname + "/uploads/"));

//build Front-end
//app.use(express.static(path.join(__dirname, ".", "front/build")));
app.use(express.static("public"));
// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlHTTP({
//     schema: schema,
//     rootValue: global,
//     graphiql: true,
//   })
// );
app.use("/api/v1", indexRouter);
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, ".", "/front/build", "index.html"));
// });

/** CRON */
require("./cron/cron")();

/** GRAPHQL */

module.exports = app;
