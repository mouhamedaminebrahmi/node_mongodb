module.exports = (app) => {
  const dbShema = require("./book.controllers");

  var router = require("express").Router();

  // Create a new dbShema
  router.post("/", dbShema.create);

  // Retrieve all dbShema
  router.get("/", dbShema.findAll);

  // Retrieve a single dbShema with id
  router.get("/:id", dbShema.findOne);

  router.get("/users/:id", dbShema.findByUserId);

  // Update a dbShema with id
  router.put("/:id", dbShema.update);

  // Delete a dbShema with id
  router.delete("/:id", dbShema.delete);

  app.use("/books", router);
};
