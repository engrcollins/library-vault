const sql = require("./db.js");

// constructor
const Library_topic = function(library_topic) {
  this.title = library_topic.title,
  this.content = library_topic.content,
  this.category = library_topic.category,
  this.tags = library_topic.tags
};

Library_topic.create = (newLibrary_topic, result) => {
  sql.query("INSERT INTO library_topics SET ?", newLibrary_topic, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created library_topic: ", { topic_id: res.insertId, ...newLibrary_topic });
    result(null, { topic_id: res.insertId, ...newLibrary_topic });
  });
};

Library_topic.findById = (library_topicId, result) => {
  sql.query(`SELECT * FROM library_topics WHERE topic_id = ${library_topicId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found library_topic: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Library_topic with the topic_id
    result({ kind: "not_found" }, null);
  });
};

Library_topic.getAll = result => {
  sql.query("SELECT * FROM library_topics", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("library_topics: ", res);
    result(null, res);
  });
};

Library_topic.updateById = (topic_id, library_topic, result) => {
  sql.query(
    "UPDATE library_topics SET title = ?, content = ?, category = ?, tags = ? WHERE topic_id = ?",
    [ library_topic.title, library_topic.content, library_topic.category, library_topic.tags, topic_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Library_topic with the topic_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated library_topic: ", { topic_id: topic_id, ...library_topic });
      result(null, { topic_id: topic_id, ...library_topic });
    }
  );
};

Library_topic.remove = (topic_id, result) => {
  sql.query("DELETE FROM library_topics WHERE topic_id = ?", topic_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Library_topic with the topic_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted library_topic with topic_id: ", topic_id);
    result(null, res);
  });
};

Library_topic.removeAll = result => {
  sql.query("DELETE FROM library_topics", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} library_topics`);
    result(null, res);
  });
};

module.exports = Library_topic;
