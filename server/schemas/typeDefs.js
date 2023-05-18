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
    postId: ID!
    text: String!
    rate: Int!
  }

  input ReviewInput {
    postId: ID!
    text: String!
    rate: Int!
  }
  

  type Post {
    _id: ID!
    role: String!
    businessName: String!
    title: String!
    image: String!
    description: String!
    price: Float!
    location: String!
    reviews: [Review!]
    rateAverage: Float
  }

  input PostInput {
    role: String!
    businessName: String!
    title: String!
    image: String!
    description: String!
    price: Float!
    location: String!
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
    createUser(input: CreateUserInput!): User
    updateUser(userId: ID!, input: CreateUserInput!): User
    deleteUser(userId: ID!): User
    createReview(user: ID!, postId: ID!, text: String!, rate: Int!): Review
    deleteReview(postId: ID!): Review
    updateReview(postId: ID!, text: String!, rate: Int!): Review
    createPost(post: PostInput!): Post
    updatePost(id: ID!, post: PostInput!): Post
    deletePost(postId: ID!): Post
    login(email:String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
