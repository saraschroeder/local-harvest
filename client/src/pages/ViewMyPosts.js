import React from "react";
import { motion } from "framer-motion";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
// import { UPDATE_POST } from "../utils/mutations";
import { DELETE_POST } from "../utils/mutations";
import { GET_POSTS } from "../utils/queries";

function ViewMyPosts() {
  // Getting farmer info by user logged in
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const userData = meData?.me || [];
  // Passing userId
  const userId = userData._id;
  
  // Get all posts from all farmers
  const { loading: postsLoading, data: postData } = useQuery(GET_POSTS);
 

  //   const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST, {
    // Reftching GET_POSTS after deleting a post (need this so we don't need to refresh page)
    refetchQueries: [{ query: GET_POSTS }],
  });

  
  if (postsLoading || meLoading) {
    return <p>Loading...</p>;
  }

  // If user is not logged in or not a Farmer
  if (userData.length === 0 || userData.role !== "Farmer") {
    return <h3>You need to be a farmer and logged in to see this page</h3>
   }
  // Function to delete post
  const handleDeletePost = async (postId) => {
    const token = Auth.isLoggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await deletePost({
        variables: { postId },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // Filter all posts to only get the ones created by farmer that was selected
  const postsByFarmer = postData.allPosts.filter((post) => post.userId === userId);

  //   const handleUpdatePost = async(postId, post) => {
  //     const token = Auth.loggedIn() ? Auth.getToken() : null;
  //     if (!token) {
  //       return false;
  //     }

  //     try {
  //         await updatePost({
  //             variables: {
  //                 ...post,
  //                 postId
  //             }
  //         })
  //     }catch (err) {
  //         console.error(err);
  //       }
  //   }
console.log(userData)
console.log(postData)
console.log(postsByFarmer)


  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-info">
          <h2 className="name">{meData.me.businessName}</h2>
          <p className="location">{meData.me.location}</p>
        </div>
      </div>
      <div className="description">{meData.me.description}</div>
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
            <button className="add-comment-button">Add Comment</button>
            <button className="add-comment-button">Edit</button>
            <button className="add-comment-button" onClick={() => handleDeletePost(post._id)}>Delete</button>
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

export default ViewMyPosts;
