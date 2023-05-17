//typeDefs
const { gql } = require("apollo-server");

const userTypeDefs = gql`
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

  type Query {
    users: [User]
    userById(userId: ID!): User
  }

  type Mutation {
    createUser(email: String!, userName: String!, password: String!, role: String!, businessName: String): User
    updateUser(userId: ID!, email: String, userName: String, password: String, role: String, businessName: String): User
    deleteUser(userId: ID!): User
  }
`;

module.exports = userTypeDefs;