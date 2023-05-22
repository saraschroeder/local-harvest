import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

import { Link } from "react-router-dom";
import { GET_USERS } from "../utils/queries";
import { states } from "../utils/helpers";

import "../assets/css/home.css";

function Main() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchCity, setSearchCity] = useState("");
  const [searchState, setSearchState] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredFarmers(data.users.filter((user) => user.role === "Farmer"));
    }
  }, [data]);

  useEffect(() => {
    if (data && data.users) {
      const filtered = data.users.filter((user) => user.role === "Farmer");
      if (searchCity.trim() !== "") {
        setFilteredFarmers(
          filtered.filter(
            (farmer) =>
              farmer.city &&
              farmer.city.toLowerCase().includes(searchCity.trim().toLowerCase())
          )
        );
      } else if (searchState) {
        setFilteredFarmers(
          filtered.filter((farmer) => farmer.state === searchState)
        );
      } else {
        setFilteredFarmers(filtered);
      }
    }
  }, [searchCity, searchState, data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :</p>;
  }

return (
  <div className="main-container">
    <div className="main-title">
      <span className="icon">
        <FaSeedling />
      </span>
      <span>Find Farmers Near You! </span>
      <span className="icon">
        <FaSeedling />
      </span>
    </div>
    <div className="search-container">
      <input
        type="text"
        placeholder="Search City..."
        value={searchCity || ""}
        onChange={(event) => setSearchCity(event.target.value)}
      />
      <i className="fa fa-search"></i>
      <select
        value={searchState}
        onChange={(event) => setSearchState(event.target.value)}
      >
        <option value="">Select State...</option>
        {states.map((state, index) => (
          <option key={index} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
    <div className="card-container">
      {filteredFarmers.map((farmer, index) => (
        <motion.div
          className="farmer-card"
          key={farmer._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h2 className="name">{farmer.businessName}</h2>
          <p className="location">
            {farmer.city}, {farmer.state}
          </p>
          <p className="description">{farmer.description}</p>
          <Link to={`/profile/${farmer._id}`} className="view-posts-btn">
            View Posts
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);
}

export default Main;
