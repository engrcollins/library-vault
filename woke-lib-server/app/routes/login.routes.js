module.exports = app => {
    const login= require("../controllers/login.controller.js");
  
  //Create a user session
  app.post("/login", login.create);
};
  
