const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
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

const Review = new model('Review', reviewSchema)

module.exports = Review;
