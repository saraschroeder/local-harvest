import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import "../assets/css/profile.css";

function Profile() {
  const farmer = {
    name: "John Doe",
    location: "New York, USA",
    description: "Experienced farmer with a passion for organic produce.",
    posts: [
      {
        id: 1,
        title: "Post 1",
        description: "First post description",
        comments: [
          {
            id: 1,
            author: "Jane Smith",
            text: "Great post!",
          },
        ],
      },
      {
        id: 2,
        title: "Post 2",
        description: "Second post description",
        comments: [
          {
            id: 2,
            author: "Mark Johnson",
            text: "Interesting insights!",
          },
          {
            id: 3,
            author: "Emily Brown",
            text: "Love this!",
          },
        ],
      },
    ],
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-info">
          <h2 className="name">{farmer.name}</h2>
          <p className="location">{farmer.location}</p>
        </div>
      </div>
      <div className="description">{farmer.description}</div>
      <h3 className="posts-heading">Posts</h3>
      <div className="posts-container">
        {farmer.posts.map((post, index) => (
          <motion.div
            className="post-card"
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="post-image"></div>
            <h4 className="post-title">{post.title}</h4>
            <p className="post-description">{post.description}</p>
            <button className="add-comment-button">Add Comment</button>
            <div className="comments-section">
              <h5>View Comments</h5>
              {post.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
