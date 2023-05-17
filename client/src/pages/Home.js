import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/explore.css"

function Explore() {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // Fetch posts from the backend or an API
  useEffect(() => {
    // Simulated data for demonstration
    const mockPosts = [
      {
        id: 1,
        title: "Fresh Organic Apples",
        image: "/images/apples.jpg",
        location: "Farmers Market, New York",
        price: "$2.99/lb",
        comments: [
          { id: 1, user: "User1", comment: "Great apples!" },
          { id: 2, user: "User2", comment: "Delicious and fresh!" },
        ],
        rating: 4.5,
      },
      {
        id: 2,
        title: "Farm Fresh Eggs",
        image: "/images/eggs.jpg",
        location: "Local Farm, California",
        price: "$4.99/dozen",
        comments: [
          { id: 3, user: "User3", comment: "Best eggs I've ever had!" },
          { id: 4, user: "User4", comment: "High-quality and tasty!" },
        ],
        rating: 5.0,
      },
     
    ];

    setPosts(mockPosts);
  }, []);

  return (
    <div className="container mt-5 explore-page">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card post-card">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.location}</p>
                <p className="card-text">{post.price}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/post/${post.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  {loggedIn && (
                    <div>
                      <span className="mr-2">Rate: {post.rating}</span>
                      <button className="btn btn-secondary">Comment</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
