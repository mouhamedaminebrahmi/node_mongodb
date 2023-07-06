const { checkRole } = require("../../../auth/checkRole");

module.exports = (app) => {
  const dbShema = require("./user.controllers");
  const { checkToken } = require("../../../auth/tokenValidation");

  const myMulter = require("../../../middleware/Multer");
  var router = require("express").Router();

  // Create a new dbShema
  router.post("/register", myMulter.uploadImg.single("image"), dbShema.register);
  router.post("/login", dbShema.login);

  // Retrieve all dbShema
  //router.get("/", checkToken, checkRole(["user", "admin"]), dbShema.findAll);

  router.get("/", dbShema.findAll);

  // Retrieve a single dbShema with id
  router.get("/:id", dbShema.findOne);

  // Update a dbShema with id
  router.put("/:id", dbShema.update);

  // Delete a dbShema with id
  router.delete("/:id", dbShema.delete);

  app.use("/users", router);
};
