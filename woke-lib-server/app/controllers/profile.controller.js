const Profile = require("../models/profile.model.js");


// Find a single Profile with a profileUsername
exports.findOne = (req, res) => {
  Profile.findByUsername(req.params.profileUsername, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.params.profileUsername}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Profile with id " + req.params.profileUsername
        });
      }
    } else res.send(data);
  });
};

// Update a Profile identified by the profileUsername in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Profile.updateById(
    req.params.profileUsername,
    new Profile(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profile with id ${req.params.profileUsername}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Profile with id " + req.params.profileUsername
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Profile with the specified profileUsername in the request
exports.delete = (req, res) => {
  Profile.remove(req.params.profileUsername, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.params.profileUsername}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Profile with id " + req.params.profileUsername
        });
      }
    } else res.send({ message: `Profile was deleted successfully!` });
  });
};

