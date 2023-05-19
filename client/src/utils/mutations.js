import { gql } from "@apollo/client";

// Mutation to create a user
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      token
      user {
        email
        userName
        role
      }
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: CreateUserInput) {
    updateUser(userId: $userId, input: $input) {
      token
      user {
        email
        userName
        role
      }
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      user {
        email
        userName
        role
      }
    }
  }
`;

// Mutation to create a new post
export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      _id
      userId
      title
      image
      description
      price
    }
  }
`;
// Mutation to update existing post
export const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $post: PostInput!) {
    updatePost(postId: $postId, post: $post) {
      _id
      userId
      title
      image
      description
      price
    }
  }
`;
// Mutation to delete existing post
export const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;
//mutation to create a new review
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      _id
      userId
      postId
      text
      rate
    }
  }
`;
//mutation to update a review
export const UPDATE_REVIEW = gql`
  mutation UpdateReview($reviewId: ID!) {
    updateReview(reviewId: $reviewId) {
      _id
      userId
      postId
      text
      rate
    }
  }
`;
//mutation to delete review by its postId
export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        userName
        email
        role
      }
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      amount
      id
      currency
      client_secret
    }
  }
`;
