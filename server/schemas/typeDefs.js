const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Review {
    _id: ID!
    user: User!
    postId: ID!
    text: String!
    rate: Int!
  }
  type Mutation {
    createReview(user: ID!, postId: ID!, text: String!, rate: Int!): Review
    deleteReview(postId: ID!): Review
    updateReview(postId: ID!, text: String!, rate: Int!): Review
  }
  `