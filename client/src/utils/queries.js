import { gql } from "@apollo/client";

// Query to fetch all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      email
      userName
      role
      businessName
      city
      state
      description
      image {
        data
        contentType
      }
      post {
        _id
        userId
        title
        image
        description
        formattedPrice
        reviews {
          _id
        }
        rateAverage
      }
    }
  }
`;

// Query to fetch a user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    userById(userId: $userId) {
      _id
      email
      userName
      role
      businessName
      city
      state
      description
      image {
        data
        contentType
      }
      post {
        _id
        userId
        title
        image
        description
        formattedPrice
        reviews {
          _id
        }
        rateAverage
      }
    }
  }
`;

// Query to fetch all posts
export const GET_POSTS = gql`
  query allPosts {
    allPosts {
      _id
      userId
      title
      image
      description
      formattedPrice
      reviews {
        _id
        userId
        userName
        postId
        text
        rate
      }
      rateAverage
    }
  }
`;

// Query to get logged farmer info
export const GET_ME = gql`
  query me {
    me {
      _id
      email
      userName
      role
      businessName
      city
      state
      description
      image {
        data
        contentType
      }
    }
  }
`;

