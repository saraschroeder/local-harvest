const { AuthenticationError } = require("apollo-server-express");
const { User, Review, Post } = require("../models");
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
    description: String
    image: UserImage
    posts: [Post]
  }
  type UserImage {
    data: String
    contentType: String
  }

  input CreateUserInput {
    email: String!
    userName: String!
    password: String!
    role: String!
    businessName: String
    location: String
    description: String
    image: UserImageInput
  }

  input UserImageInput {
    data: String
    contentType: String
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
    createUser(input: CreateUserInput!): User
    updateUser(userId: ID!, input: CreateUserInput!): User
    deleteUser(userId: ID!): User
    createReview(user: ID!, postId: ID!, text: String!, rate: Int!): Review
    deleteReview(postId: ID!): Review
    updateReview(postId: ID!, text: String!, rate: Int!): Review
  }
`;

module.exports = typeDefs;
