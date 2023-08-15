module.exports = (app) => {
  const dbShema = require("./book.controllers");

  var router = require("express").Router();

  // Create a new dbShema
  router.post("/books", dbShema.create);

  // Retrieve all dbShema
  router.get("/books", dbShema.findAll);

  // Retrieve a single dbShema with id
  router.get("/books/:id", dbShema.findOne);

  router.get("/books/:id", dbShema.findByUserId);

  // Update a dbShema with id
  router.put("/books/:id", dbShema.update);

  // Delete a dbShema with id
  router.delete("/users/:id", dbShema.delete);

  app.use("/books", router);
};
