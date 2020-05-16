module.exports = app => {
    const topics = require("../controllers/topic.controller.js");
  
    // Create a new Topic
    app.post("/topics", topics.create);
  
    // Retrieve all Topics
    app.get("/topics", topics.findAll);
  
    // Retrieve a single Topic with topicId
    app.get("/topics/:topicId", topics.findOne);
  
    // Update a Topic with topicId
    app.put("/topics/:topicId", topics.update);
  
    // Delete a Topic with topicId
    app.delete("/topics/:topicId", topics.delete);
  
    // Create a new Topic
    app.delete("/topics", topics.deleteAll);
  };
  