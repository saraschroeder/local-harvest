// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Main() {
//   const [farmers, setFarmers] = useState([]);

//   useEffect(() => {
//     async function fetchFarmers() {
//       try {
//         const response = await axios.get("/api/farmers"); // Replace with our actual api endpoint
//         setFarmers(response.data);
//       } catch (error) {
//         console.error("Failed to fetch farmers:", error);
//       }
//     }

//     fetchFarmers();
//   }, []);

//   return (
//     <div>
//       {farmers.map((farmer) => (
//         <div key={farmer.id}>
//           <img src={farmer.avatar} alt="Farmer's avatar" />
//           <h2>{farmer.name}</h2>
//           <p>{farmer.location}</p>
//           <p>{farmer.description}</p>
//           <p>Average Rating: {farmer.averageRating}</p>
//           <Link to={`/farmer/${farmer.id}`}>View Posts</Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Main;


import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link component
import "../assets/css/home.css";

function Main() {
  const farmers = [
    {
      id: 1,
      avatar: "https://example.com/avatar1.jpg",
      name: "John Doe",
      location: "New York, USA",
      description: "Experienced farmer with a passion for organic produce.",
      averageRating: 4.8,
    },
    {
      id: 2,
      avatar: "https://example.com/avatar2.jpg",
      name: "Jane Smith",
      location: "London, UK",
      description: "Specializes in sustainable farming practices.",
      averageRating: 4.5,
    },
  ];

  return (
    <div className="main-container">
      {farmers.map((farmer, index) => (
        <motion.div
          className="farmer-card"
          key={farmer.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <img className="avatar" src={farmer.avatar} alt="Farmer's avatar" />
          <h2 className="name">{farmer.name}</h2>
          <p className="location">{farmer.location}</p>
          <p className="description">{farmer.description}</p>
          <div className="rating">
            <span className="rating-text">Average Rating:</span>
            <span className="star-icons">
              {Array.from(
                { length: Math.floor(farmer.averageRating) },
                (_, index) => (
                  <FaStar key={index} className="star-icon" />
                )
              )}
            </span>
          </div>
          <Link to={`/profile/${farmer.id}`} className="view-posts-btn">
            View Posts
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default Main;


