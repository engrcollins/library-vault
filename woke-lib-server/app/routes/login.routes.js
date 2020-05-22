const express = require('express');
const app = express.Router();
module.exports = app => {
    const login= require("../controllers/login.controller.js");
  
  //Create a user session
  app.post("/login", login.create);

  //Get user session
  app.get("/login", (req, res) => {
    if(req.session.sessionID){
      res.setHeader('Content-Type', 'text/html')
      res.write("<p>Welcome, your session Id is " + req.sessionID +'</p>')
      res.end()
    }
  });
};
  
