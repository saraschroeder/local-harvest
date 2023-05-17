const { Schema, model } = require('mongoose');
const { User } = require('./User')

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const Review = model('Review', reviewSchema)

module.exports = Review;
