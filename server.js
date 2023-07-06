const mongoose = require("mongoose");
const app = require("./app");
var http = require("http");

var server = http.createServer(app);
/** SOCKET */
io = module.exports = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  //    transports :  ['websocket']
});
require("./socket/socket").__init__();

const db = require("./models");
console.log(db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, console.log("Server started on port 3001"));
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
