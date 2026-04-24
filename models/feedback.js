const mongoose = require("mongoose");

const submittedBySchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
    email: { type: String, required: true, lowercase: true, trim: true },
  },
  { _id: false },
);

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  submittedBy: { type: submittedBySchema, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

feedbackSchema.index({ "submittedBy.email": 1, createdAt: -1 });

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;  
