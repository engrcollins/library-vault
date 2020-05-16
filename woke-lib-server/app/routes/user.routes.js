module.exports = app => {
  const library_users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/library_users", library_users.create);

  // Retrieve all Users
  app.get("/library_users", library_users.findAll);

  // Retrieve a single User with userId
  app.get("/library_users/:userId", library_users.findOne);

  // Update a User with userId
  app.put("/library_users/:userId", library_users.update);

  // Delete a User with userId
  app.delete("/library_users/:userId", library_users.delete);

  // Create a new User
  app.delete("/library_users", library_users.deleteAll);
};
