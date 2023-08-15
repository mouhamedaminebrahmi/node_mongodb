const db = require("../../../models/index");
const ShemaDb = db.users;
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Create and Save a new ShemaDb
exports.register = (req, res) => {
  // Create a ShemaDb
  const salt = genSaltSync(10);
  const object = new ShemaDb({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: hashSync(req.body.password, salt),
    image: req?.file?.path,
  });
  // Save ShemaDb in the database
  object
    .save(object)
    .then((data) => {
      data.password = undefined;
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ShemaDb.",
      });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  ShemaDb.findOne({ email })
    .then((data) => {
      const result = compareSync(password, data.password);
      if (result) {
        const jwt = sign({ data }, "qwe1234");
        data.password = undefined;
        res.send({ data, token: jwt });
      } else {
        res.send("wrong email or pass");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ShemaDbs.",
      });
    });
};

// Retrieve all ShemaDbs from the database.
exports.findAll = (req, res) => {
  ShemaDb.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ShemaDbs.",
      });
    });
};

// Find a single ShemaDb with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ShemaDb.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Not found ShemaDb with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving ShemaDb with id=" + id });
    });
};

// Update a ShemaDb by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  ShemaDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ShemaDb with id=${id}. Maybe ShemaDb was not found!`,
        });
      } else res.send({ message: "ShemaDb was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ShemaDb with id=" + id,
      });
    });
};

// Delete a ShemaDb with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ShemaDb.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ShemaDb with id=${id}. Maybe ShemaDb was not found!`,
        });
      } else {
        res.send({
          message: "ShemaDb was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ShemaDb with id=" + id,
      });
    });
};
