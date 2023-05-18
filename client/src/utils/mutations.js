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

// Mutation to create a new post
export const CREATE_POST = gql`
  mutation createPost($post: PostInput!) {
  createPost(post: $post) {
    _id
    title
    image
    description
    price
    reviews {
      _id
      postId
      text
      rate
    }
    rateAverage
  }
}
`
// Mutation to update existing post
export const UPDATE_POST = gql`
  mutation updatePost($updatePostId: ID!, $post: PostInput!) {
  updatePost(id: $updatePostId, post: $post) {
    _id
    title
    image
    description
    price
    reviews {
      _id
      postId
      text
      rate
    }
    rateAverage
  }
}
`
// Mutation to delete existing post
export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
    title
    image
    description
    price
    reviews {
      _id
      postId
      text
      rate
    }
    rateAverage
  }
}
`
//mutation to create a new review
export const CREATE_REVIEW = gql`
mutation CreateReview($reviewData: ReviewInput!) {
  createReview(reviewData: $reviewData) {
    _id
    postId
    text
    rate
  }
}
`
//mutation to update a review
export const UPDATE_REVIEW = gql`
  mutation UpdateReview($reviewData: ReviewInput!) {
    updateReview(reviewData: $reviewData) {
      _id
      postId
      text
      rate
    }
  }
`
//mutation to delete review by its postId
export const DELETE_REVIEW = gql`
mutation DeleteReview($postId: ID!) {
  deleteReview(postId: $postId) {
    _id
    postId
    text
    rate
  }
}
`