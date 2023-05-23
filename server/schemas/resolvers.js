const { User, Review, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    userById: async (_, { userId }) => {
      return User.findOne({ _id: userId });
    },
    allPosts: async () => {
      try {
        // Use the Post model to query for posts with matching userId
        const posts = await Post.find().populate('reviews');
    
        return posts;
      } catch (error) {
        throw new Error('Failed to fetch posts by farmer');
      }
    },
    me: async (parent, args, context) => {

      if (context.user) {
          return User.findOne({ _id: context.user._id });
      }
      // Throw error if no user is found
      throw new AuthenticationError("Cannot find a user with this id!");
  }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      // Create signin token
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (_, { userId, ...updateData }) => {
      return User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
    },
    deleteUser: async (_, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    createReview: async (parent, { input }, context) => {
      if (context.user) {
        const newReview = await Review.create(input);
        const postId = input.postId
        // Saving reviewId in Post
        await Post.findOneAndUpdate(
          { _id: postId}, 
          { $addToSet: { reviews: newReview._id, rating: newReview.rate}},
          { new: true }
        )
        return newReview;
      }
      throw new AuthenticationError("Something went wrong!");
    },

    updateReview: async (parent, { reviewData }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewData.reviewId, user: context.user._id },
          reviewData,
          { new: true }
        );
        return updatedReview;
      }
      throw new AuthenticationError("Something went wrong!");
    },
    deleteReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const reviewToDelete = await Review.findOneAndDelete({ _id: reviewId });
        await Post.findOneAndUpdate(
          { _id: reviewToDelete.postId}, 
          { $pull: { reviews: reviewToDelete._id }},
          { new: true }
        )
        return reviewToDelete;
      }
      throw new AuthenticationError("Something went wrong!");
    },
    createPost: async (parent, { postInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in to add posts");
      }
      if(context.user.role !== "Farmer") {
        throw new AuthenticationError("You need to be logged in as a Farmer to add posts");
      }
      const userId = context.user._id;
      const newPost = await Post.create({
        ...postInput,
        userId
      });
    
      if (!newPost) {
        throw new AuthenticationError("Couldn't create new post!");
      }
      return newPost;
    },
    updatePost: async (parent, { postId, post }) => {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: post },
        { new: true }
      );
      if (!updatedPost) {
        throw new AuthenticationError("Couldn't update post!");
      }
      return updatedPost;
    },
    deletePost: async (parent, { postId }, context) => {
      return await Post.findOneAndDelete(
        { _id: postId },
        { new: true }
      );

    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      const correctPassword = await user.verifyPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Wrong password!");
      }
      // If password is correct, create signin token
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
