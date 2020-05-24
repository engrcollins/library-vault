const sql = require("./db.js");

// constructor
const Profile = function(profile) {
  this.firstName = profile.firstName;
  this.lastName = profile.lastName;
  this.gender = profile.gender;
  this.birthDate = profile.birthDate;
  this.phone = profile.phone;
  this.createdAt = profile.createdAt
};

Profile.findByUsername= (profileUsername, result) => {
    console.log("passed")
  sql.query("SELECT firstName, lastName, gender, birthDate, createdAt FROM library_users WHERE username = ?", [profileUsername], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found profile: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Profile with the user_id
    result({ kind: "not_found" }, null);
  });
};

Profile.updateByUsername = (username, profile, result) => {
  sql.query(
    "UPDATE library_users SET firstName = ?, lastName = ?, gender = ?, birthDate =?, updatedAt = ? WHERE username= ?",
    [ profile.firstName, profile.lastName, profile.gender, profile.birthDate, profile.createdAt, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Profile with the user_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated profile: ", { user_id: user_id, ...profile });
      result(null, { user_id: user_id, ...profile });
    }
  );
};

Profile.remove = (username, result) => {
  sql.query("DELETE FROM library_users WHERE username= ?", username, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profile with the user_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted profile with user_id: ", username);
    result(null, res);
  });
};


module.exports = Profile;
