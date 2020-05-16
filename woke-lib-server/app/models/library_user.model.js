const sql = require("./db.js");

// constructor
const Library_user = function(library_user) {
  this.firstName = library_user.firstName;
  this.lastName = library_user.lastName;
  this.gender = library_user.gender;
  this.birthDate = library_user.birthDate;
  this.username = library_user.username;
  this.phone = library_user.phone;
  this.email = library_user.email;
  this.password = library_user.password;
  this.createdAt = library_user.createdAt
};

Library_user.create = (newLibrary_user, result) => {
// generate a hash from string
var crypto = require('crypto'),
    text = newLibrary_user.password,
    key = 'ife key'

// create hahs
var hash = crypto.createHmac('sha512', key)
hash.update(text)
var pass = hash.digest('hex')

// print result
console.log(pass);
newLibrary_user.password = pass;

sql.query("SELECT * FROM library_users WHERE username = ?",  [newLibrary_user.username], (err,res) =>{
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log(`library_user: ${res[0].username} exist`);
      result(null, res[0], res.length);
      return;
    }else{
      sql.query("INSERT INTO library_users SET ?", newLibrary_user, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("data inserted");
      });
    }
});
}

Library_user.findById = (library_userId, result) => {
  sql.query(`SELECT * FROM library_users WHERE user_id = ${library_userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found library_user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Library_user with the user_id
    result({ kind: "not_found" }, null);
  });
};

Library_user.getAll = result => {
  sql.query("SELECT * FROM library_users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("library_users: ", res);
    result(null, res);
  });
};

Library_user.updateById = (user_id, library_user, result) => {
  sql.query(
    "UPDATE library_users SET firstName = ?, lastName = ?, gender = ?, birthDate =?, username = ?, phone = ?, email = ?, password = ?, updatedAt = ? WHERE user_id = ?",
    [ library_user.firstName, library_user.lastName, library_user.gender, library_user.birthDate, library_user.username, library_user.phone, library_user.email, library_user.password, library_user.createdAt, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Library_user with the user_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated library_user: ", { user_id: user_id, ...library_user });
      result(null, { user_id: user_id, ...library_user });
    }
  );
};

Library_user.remove = (user_id, result) => {
  sql.query("DELETE FROM library_users WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Library_user with the user_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted library_user with user_id: ", user_id);
    result(null, res);
  });
};

Library_user.removeAll = result => {
  sql.query("DELETE FROM library_users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} library_users`);
    result(null, res);
  });
};


module.exports = Library_user;
