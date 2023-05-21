import React from "react";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GET_USERS } from "../utils/queries"; 
import { useEffect } from "react";

import "../assets/css/home.css";

function Main() {
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :</p>;
  }

  const farmers = data.users.filter((user) => user.role === "Farmer");

  return (
    <div className="main-container">
      {farmers.map((farmer, index) => (
        <motion.div
          className="farmer-card"
          key={farmer._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h2 className="name">{farmer.businessName}</h2>
          <p className="location">{farmer.city}, {farmer.state}</p>
          <p className="description">{farmer.description}</p>
          {/* <div className="rating">
            <span className="rating-text">Average Rating:</span>
            <span className="star-icons">
              {Array.from(
                { length: Math.floor(farmer.rateAverage) },
                (_, index) => (
                  <FaStar key={index} className="star-icon" />
                )
              )}
            </span>
          </div> */}
          <Link to={`/profile/${farmer._id}`} className="view-posts-btn">
            View Posts
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default Main;
