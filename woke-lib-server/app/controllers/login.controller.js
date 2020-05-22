const Login_user = require("../models/login_user.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a Login_user
  const login_user = new Login_user({
    username: req.body.username,
    password: req.body.password,
  });

  // Find this Login_user in the database
  Login_user.create(login_user, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Invalid credentials"
      });
    }else{
      //sessionData = req.session;
      /*sessionData.user = {};
      let username = data.username;
      let id = data.user_id;
      sessionData.user.username = username;
      sessionData.user.id =  id;*/
      req.session.user = data.username;
      console.log(data)
      console.log(req.session.user);
      if(req.session.page_views){
        req.session.page_views++;
        console.log("You visited McCollins Technologies " + req.session.page_views + " times, " + req.sessionID);
     } else {
        req.session.page_views = 1;
        console.log({ message: "Welcome to McCollins Technologies." });
     }
      res.send(data)
    }
  });
}