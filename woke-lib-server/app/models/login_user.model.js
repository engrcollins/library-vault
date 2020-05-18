const sql = require("./db.js");
const bodyParser = require("body-parser");
// constructor
const Login_user = function(login_user) {
  this.username = login_user.username;
  this.password = login_user.password;
};

Login_user.create = (newLogin_user, result) => {
    // generate a hash from string
    var crypto = require('crypto'),
        text = newLogin_user.password,
        key = 'ife key'

    // create hahs
    var hash = crypto.createHmac('sha512', key)
    hash.update(text)
    var pass = hash.digest('hex')

    // print result
    newLogin_user.password = pass;
    sql.query('SELECT * FROM library_users WHERE username = ? AND password = ?', [newLogin_user.username, newLogin_user.password], (err,res) =>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(`login_user: Congrats ${res[0].username} exists`);
            result(null, res[0].username);
            return;
        }
        // not found Customer with the id
        result({ kind: "Invalid credentials" }, null);
    });
}
module.exports = Login_user;