const { User, Review, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    userById: async (_, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    createUser: async (_, { email, userName, password, role, businessName, location, description, image }) => {
      const user = new User({
        email,
        userName,
        password,
        role,
        businessName,
        location,
        description,
        image
      });
      return user.save();
    },
    updateUser: async (_, { userId, ...updateData }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );
    },
    deleteUser: async (_, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    createReview: async (parent, { user, postId, text, rate }, context) => {
      if (context.user) {
        const newReview = await Review.create({
          user,
          postId,
          text,
          rate,
        });
        return newReview;
      }
      throw new AuthenticationError("Something went wrong!");
    },
    updateReview: async (parent, { postId, text, rate }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { postId, user: context.user._id },
          { text, rate },
          { new: true }
        );
        return updatedReview;
      }
      throw new AuthenticationError("Something went wrong!");
    },
    deleteReview: async (parent, { postId }, context) => {
      if (context.user) {
        const reviewToDelete = await Review.findOneAndDelete({
          postId,
          user: context.user._id,
        });
        return reviewToDelete;
      }
    },
  },
};

module.exports = resolvers;