const { Review } = require('../models/Review.js');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Mutation: {
    createReview: async (parent, { user, postId, text, rate }) => {
        const newReview = await Review.create({
            user,
            postId,
            text,
            rate,
          });
          return newReview;
        }
    }
}


module.exports = resolvers;
