import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>©Your Farmers Marketplace</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

