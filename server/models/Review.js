const { Schema } = require('mongoose');

const reviewSchema = new Schema({
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

module.exports = reviewSchema
