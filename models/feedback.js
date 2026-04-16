const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  submittedBy: {
    username: String,
    role: String,
    email: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;  