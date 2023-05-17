import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/about.css";
import { FaCarrot, FaLeaf, FaUsers } from "react-icons/fa";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`container mt-5 fade-in ${isVisible ? "visible" : ""}`}>
      <h1>About Us</h1>
      <p>
        We are a platform dedicated to connecting local farmers with consumers
        in their area. Our mission is to promote healthier, sustainable, and
        community-driven food choices by making it easier to buy fresh,
        locally-grown produce.
      </p>
      <p>
        Whether you're a farmer looking to reach more customers, or a consumer
        who wants to shop locally and sustainably, we're here to help. Join us
        in supporting our local economies and promoting a healthier planet!
      </p>
      <div className="icon-container">
        <div>
          <FaCarrot size={50} color="#dc7027" />
          <p>Healthy</p>
        </div>
        <div>
          <FaLeaf size={50} color="#183a1d" />
          <p>Sustainable</p>
        </div>
        <div>
          <FaUsers size={50} />
          <p>Community-driven</p>
        </div>
      </div>
    </div>
  );
};

export default About;
