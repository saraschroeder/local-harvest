const { Schema, model } = require("mongoose");

// Import schema from Post.js
const postSchema = require('./Post')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  image: { data: Buffer, contentType: String }, // Image field
  post: [postSchema],
});

const User = model("User", userSchema);

module.exports = User;
