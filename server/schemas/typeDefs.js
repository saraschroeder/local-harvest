const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    userName: String!
    password: String!
    role: String!
    businessName: String
    location: String
    posts: [Post]
  }
  type Review {
    _id: ID!
    user: User!
    postId: ID!
    text: String!
    rate: Int!
  }

  type Query {
    users: [User]
    userById(userId: ID!): User
  }

  type Mutation {
    createUser(
      email: String!
      userName: String!
      password: String!
      role: String!
      businessName: String
    ): User
    updateUser(
      userId: ID!
      email: String
      userName: String
      password: String
      role: String
      businessName: String
    ): User
    deleteUser(userId: ID!): User
    createReview(user: ID!, postId: ID!, text: String!, rate: Int!): Review
    deleteReview(postId: ID!): Review
    updateReview(postId: ID!, text: String!, rate: Int!): Review
  }
`;

module.exports = typeDefs;
