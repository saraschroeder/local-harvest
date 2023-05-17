const { User, Review, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    userById: async (_, { userId }) => {
      return User.findOne({ _id: userId });
  },
  Mutation: {
    createUser: async (_, { email, userName, password, role, businessName, location }) => {
      const user = new User({
        email,
        userName,
        password,
        role,
        businessName,
        location
      });
      return user.create();
    },
    updateUser: async (_, { userId, email, userName, password, role, businessName, location }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { email, userName, password, role, businessName, location },
        { new: true }
      );
    },
    deleteUser: async (_, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
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
  },
};

module.exports = resolvers;