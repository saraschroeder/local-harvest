// const { AuthenticationError } = require("apollo-server-express");
// const { User, Review, Post } = require("../models");
// const { signToken } = require("../utils/auth");

const { gql } = require("apollo-server-express");

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
    post: [Post]
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
  }

  input UserImageInput {
    data: String
    contentType: String
  }

  type Review {
    _id: ID!
    userId: String!
    postId: ID!
    text: String!
    rate: Int!
  }

  input ReviewInput {
    userId: String!
    postId: ID!
    text: String!
    rate: Int!
  }
  
  type Post {
    _id: ID!
    userId: String!
    title: String!
    image: String!
    description: String!
    price: Float!
    reviews: [Review]
    rateAverage: Float
  }

  input PostInput {
    title: String!
    image: String!
    description: String!
    price: Float!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    userById(userId: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput): Auth
    updateUser(userId: ID!, input: CreateUserInput): Auth
    deleteUser(userId: ID!): Auth
    createReview(input: ReviewInput!): Review
    deleteReview(reviewId: ID!): Review
    updateReview(reviewId: ID!, input: ReviewInput): Review
    createPost(post: PostInput!): Post
    updatePost(postId: ID!, post: PostInput!): Post
    deletePost(postId: ID!): Post
    login(email:String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
