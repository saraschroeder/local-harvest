const { Schema, model } = require('mongoose');
// Import schema from Review.js
const reviewSchema = require('./Review')

const postSchema = new Schema({
    // Check with team: should we add [postSchema] in user and not have role, businessName and location here??
    role: {
      type: String,
      ref: 'User',
      required: true
    },
    businessName: {
      type: String,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    reviews: [reviewSchema]
  },
  {
    toJSON: {
      virtuals: true,
    }
});
  
  // Virtual for calculating rate average
  postSchema.virtual('rateAverage').get(function () {
    if (this.reviews.length === 0) {
      return 0;
    }
  
    const totalRate = this.reviews.reduce((accumulator, review) => {
      return accumulator + review.rate;
    }, 0);
  
    return totalRate / this.reviews.length;
  });
  
//   const Post = model('Post', postSchema);

//   module.exports = Post

module.exports = postSchema