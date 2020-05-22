module.exports = app => {
  const library_user = require("../controllers/user.controller.js");
  

  //Create a user
  app.post("/library_users", library_user.create);

    //Retrieve all users
    app.get("/library_users", library_user.findAll);
  
};
