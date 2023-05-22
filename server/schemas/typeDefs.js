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
    city: String
    state: String
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
    city: String
    state: String
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
    price: String!
    reviews: [Review]
    rating: [Float]
    rateAverage: Float
    formattedPrice: String
  }

  input PostInput {
    title: String!
    image: String!
    description: String!
    price: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type PaymentIntent {
  id: ID!
  client_secret: String!
  amount: Int!
  currency: String!
}

  type Query {
    users: [User]
    userById(userId: ID!): User
    allPosts: [Post]
    me: User
  }


  type Mutation {
    createUser(input: CreateUserInput): Auth
    updateUser(userId: ID!, input: CreateUserInput): Auth
    deleteUser(userId: ID!): Auth
    createReview(input: ReviewInput!): Review
    deleteReview(reviewId: ID!): Review
    updateReview(reviewId: ID!, input: ReviewInput): Review
    createPost(postInput: PostInput!): Post
    updatePost(postId: ID!, post: PostInput!): Post
    deletePost(postId: ID!): Post
    login(email:String!, password: String!): Auth
    createPaymentIntent(amount: Int!): PaymentIntent!
  }
`;

module.exports = typeDefs;
