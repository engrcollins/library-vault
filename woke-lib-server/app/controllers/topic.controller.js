const Library_topic = require("../models/library_topic.model.js");

// Create and Save a new Library_topic
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Library_topic
  const library_topic = new Library_topic({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags
  });

  // Save Library_topic in the database
  Library_topic.create(library_topic, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Library_topic."
      });
    else res.send(data);
  });
};

// Retrieve all Topics from the database.
exports.findAll = (req, res) => {
  Library_topic.getAll((err, data) => {
    console.log(req.sessionID);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving library_topics."
      });
    else res.send(data);
  });
};

// Find a single Library_topic with a library_topicId
exports.findOne = (req, res) => {
  Library_topic.findById(req.params.library_topicId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Library_topic with id ${req.params.library_topicId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Library_topic with id " + req.params.library_topicId
        });
      }
    } else res.send(data);
  });
};

// Update a Library_topic identified by the library_topicId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Library_topic.updateById(
    req.params.library_topicId,
    new Library_topic(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Library_topic with id ${req.params.library_topicId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Library_topic with id " + req.params.library_topicId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Library_topic with the specified library_topicId in the request
exports.delete = (req, res) => {
  Library_topic.remove(req.params.library_topicId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Library_topic with id ${req.params.library_topicId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Library_topic with id " + req.params.library_topicId
        });
      }
    } else res.send({ message: `Library_topic was deleted successfully!` });
  });
};

// Delete all Topics from the database.
exports.deleteAll = (req, res) => {
  Library_topic.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all library_topics."
      });
    else res.send({ message: `All Topics were deleted successfully!` });
  });
};
