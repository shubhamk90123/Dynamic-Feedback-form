const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["admin", "user"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
