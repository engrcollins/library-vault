module.exports = app => {
  const library_user = require("../controllers/user.controller.js");
  

  //Create a user session
  app.post("/library_users", library_user.create);
};
