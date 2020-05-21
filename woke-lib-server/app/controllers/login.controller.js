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
      req.session.user = data.username;
      req.session.loggedin = true;
      console.log(req.session.loggedin)
      console.log(req.session.user)
      return res.send(data.username);
    }
  });
}