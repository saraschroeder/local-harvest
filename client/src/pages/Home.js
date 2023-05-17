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
