const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

// user model
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
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {type: String 
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

// Below code is from Module 21 Challenge
// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
