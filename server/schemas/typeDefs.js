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
    image: String
    post: [Post]
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
    image: String
  }

  type Review {
    _id: ID!
    userId: ID!
    userName: String!
    postId: ID!
    text: String!
    rate: Int!
  }

  input ReviewInput {
    userId: ID!
    userName: String!
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
  }
`;

module.exports = typeDefs;
