const db = require("../../../models/index");
const ShemaDb = db.books;
const { getDataFromRedis, setDataInRedis } = require("../../../config/redis.config");

// Create and Save a new ShemaDb
exports.create = (req, res) => {
  // Create a ShemaDb
  const object = new ShemaDb(req.body);
  // Save ShemaDb in the database
  object
    .save(object)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ShemaDb.",
      });
    });
};

// Retrieve all ShemaDbs from the database.
exports.findAll = async (req, res) => {
  const REDIS_KEY = "books";
  let results;
  let dataFromCache = false;
  const cachedResults = await getDataFromRedis(REDIS_KEY);
  if (cachedResults) {
    dataFromCache = true;
    results = JSON.parse(cachedResults);
    console.log("from cache");
    res.send(results);
  } else {
    ShemaDb.find()
      .populate({ path: "userId", select: "nom" })
      .then(async (data) => {
        console.log("no cache");
        await setDataInRedis(REDIS_KEY, data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving ShemaDbs.",
        });
      });
  }
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

exports.findByUserId = (req, res) => {
  const id = req.params.id;
  ShemaDb.find({ userId: id })
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
