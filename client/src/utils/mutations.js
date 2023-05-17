import { gql } from '@apollo/client';

// Mutation to create a user
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      email
      userName
      role
      businessName
      location
      description
      image {
        data
        contentType
      }
      posts {
        // TBD
      }
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: CreateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      _id
      email
      userName
      role
      businessName
      location
      description
      image {
        data
        contentType
      }
      posts {
        // TBD
      }
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      email
      userName
      role
      businessName
      location
      description
      image {
        data
        contentType
      }
      posts {
        // TBD
      }
    }
  }
`;
