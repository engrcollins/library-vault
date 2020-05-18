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
    password: req.body.password
  });

  // Find this Login_user in the database
  Login_user.create(login_user, (err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Login_user."
      });
     } else {
      req.session.loggedin = true;
      req.session.username = login_user.username;
      console.log(req.session.loggedin, req.session.username)
      res.send(data)

  }
});
}