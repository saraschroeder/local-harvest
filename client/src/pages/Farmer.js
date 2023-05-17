// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Profile() {
//   const { id } = useParams(); // Get the farmer ID from the URL parameter
//   const [farmer, setFarmer] = useState(null);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     async function fetchFarmer() {
//       try {
//         const response = await axios.get(`/api/farmers/${id}`); // Replace with our actual API endpoint
//         setFarmer(response.data);
//       } catch (error) {
//         console.error("Failed to fetch farmer:", error);
//       }
//     }

//     async function fetchPosts() {
//       try {
//         const response = await axios.get(`/api/farmers/${id}/posts`); // Replace with our actual API endpoint
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//       }
//     }

//     fetchFarmer();
//     fetchPosts();
//   }, [id]);

//   return (
//     <div>
//       {farmer && (
//         <div>
//           <img src={farmer.avatar} alt="Farmer's avatar" />
//           <h2>{farmer.name}</h2>
//           <p>{farmer.location}</p>
//           <p>{farmer.description}</p>
//           <p>Average Rating: {farmer.averageRating}</p>
//         </div>
//       )}

//       {posts.map((post) => (
//         <div key={post.id}>
//           <img src={post.image} alt="Post" />
//           <h3>{post.title}</h3>
//           <p>{post.description}</p>
//           <p>Price: {post.price}</p>
//           {/* need add to cart button, comment and rating options here */}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Profile;
