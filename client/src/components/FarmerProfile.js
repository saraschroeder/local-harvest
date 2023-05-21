import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import "../assets/css/profile.css";
import { useParams} from 'react-router-dom';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_POSTS } from "../utils/queries";
import { GET_USER_BY_ID } from "../utils/queries";

function Profile() {
  // const farmer = {
  //   name: "John Doe",
  //   location: "New York, USA",
  //   description: "Experienced farmer with a passion for organic produce.",
  //   posts: [
  //     {
  //       id: 1,
  //       title: "Post 1",
  //       description: "First post description",
  //       comments: [
  //         {
  //           id: 1,
  //           author: "Jane Smith",
  //           text: "Great post!",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: "Post 2",
  //       description: "Second post description",
  //       comments: [
  //         {
  //           id: 2,
  //           author: "Mark Johnson",
  //           text: "Interesting insights!",
  //         },
  //         {
  //           id: 3,
  //           author: "Emily Brown",
  //           text: "Love this!",
  //         },
  //       ],
  //     },
  //   ],
  // };

  const { farmerId: farmerParam } = useParams();
  // Get all posts from all farmers
  const { loading: postsLoading, data: postData } = useQuery(GET_POSTS);
  // Get user data for farmer that was selected
  const { loading: userLoading, data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { userId: farmerParam },
  });


  const [showCommentForm, setShowCommentForm] = useState(false);
  const [rating, setRating] = useState(0);


 const handleRating = (selectedRating) => {
   setRating(selectedRating);
 };


  if (postsLoading || userLoading) {
    return <p>Loading...</p>;
  }
  // If userId selected in not from a Farmer, return the below
  if (userData.userById.role !== "Farmer") {
    return (
      <h3>
        Sorry, only Farmers can publish posts, the user selected is a Consumer
      </h3>
    );
  }
  // Filter all posts to only get the ones created by farmer that was selected
  const postsByFarmer = postData.allPosts.filter(
    (post) => post.userId === farmerParam
  );
  // If there are no posts returns the below
  if (postsByFarmer.length === 0) {
    return (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar"></div>
          <div className="profile-info">
            <h2 className="name">{userData.userById.businessName}</h2>
            <p className="location">{userData.userById.location}</p>
          </div>
        </div>
        <div className="description">{userData.userById.description}</div>
        <h3 className="posts-heading">
          This Farmer does not have any posts yet
        </h3>
      </div>
    );
  }
  // If there are posts by the selected farmer, show them on page
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-info">
          <h2 className="name">{userData.userById.businessName}</h2>
          <p className="location">{userData.userById.location}</p>
        </div>
      </div>
      <div className="description">{userData.userById.description}</div>
      <h3 className="posts-heading">Posts</h3>
      <div className="posts-container">
        {postsByFarmer.map((post, index) => (
          <motion.div
            className="post-card"
            key={post._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="post-image"></div>
            <h4 className="post-title">{post.title}</h4>
            <p className="post-description">{post.description}</p>
            <button
              className="add-comment-button"
              onClick={() => setShowCommentForm(true)}
            >
              Add Comment
            </button>
            {showCommentForm && (
              <div className="comment-form">
                <div className="rating"> Rate: 
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`star-icon ${
                        rating >= index + 1 ? "filled" : ""
                      }`}
                      onClick={() => handleRating(index + 1)}
                    />
                  ))}
                </div>
                <textarea
                  className="comment-input"
                  placeholder="Enter your comment..."
                ></textarea>
                <button
                  className="submit-comment-button"
                >
                  Submit Comment
                </button>
              </div>
            )}
            {/* <div className="comments-section">
              <h5>View Comments</h5>
              {post.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Profile;