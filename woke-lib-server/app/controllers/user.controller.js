const Library_user = require("../models/library_user.model.js");

// Create and Save a new Library_user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Library_user
  const library_user = new Library_user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    createdAt: req.body.createdAt
  });

  // Save Library_user in the database
  Library_user.create(library_user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Library_user."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Library_user.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving library_users."
      });
    else res.send(data);
  });
};

// Find a single Library_user with a library_userId
exports.findOne = (req, res) => {
  Library_user.findById(req.params.library_userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Library_user with id ${req.params.library_userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Library_user with id " + req.params.library_userId
        });
      }
    } else res.send(data);
  });
};

// Update a Library_user identified by the library_userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Library_user.updateById(
    req.params.library_userId,
    new Library_user(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Library_user with id ${req.params.library_userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Library_user with id " + req.params.library_userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Library_user with the specified library_userId in the request
exports.delete = (req, res) => {
  Library_user.remove(req.params.library_userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Library_user with id ${req.params.library_userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Library_user with id " + req.params.library_userId
        });
      }
    } else res.send({ message: `Library_user was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Library_user.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all library_users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
