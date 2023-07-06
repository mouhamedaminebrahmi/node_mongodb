const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          return res.send("invalid token");
        } else {
          next();
        }
      });
    } else {
      res.send("acces denied");
    }
  },
};
