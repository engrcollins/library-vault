module.exports = app => {
    const library_topic = require("../controllers/topic.controller.js");
  
    // Create a new Topic
    app.post("/library_topics", library_topic.create);
  
    // Retrieve all Topics
    app.get("/library_topics", library_topic.findAll);
  
    // Retrieve a single Topic with topicId
    app.get("/library_topics/:topicId", library_topic.findOne);
  
    // Update a Topic with topicId
    app.put("/library_topics/:topicId", library_topic.update);
  
    // Delete a Topic with topicId
    app.delete("/library_topics/:topicId", library_topic.delete);
  
    // Create a new Topic
    app.delete("/library_topics", library_topic.deleteAll);
  };
  