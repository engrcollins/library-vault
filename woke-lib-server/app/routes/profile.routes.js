module.exports = app => {
    const profile = require("../controllers/profile.controller.js");
  
    // Retrieve a single Topic with topicId
    app.get("/profile/:profileUsername", profile.findOne);

    // Update a Topic with topicId
    app.put("/profile/:username", profile.update);
  
    // Delete a Topic with topicId
    app.delete("/profile/:username", profile.delete);
};