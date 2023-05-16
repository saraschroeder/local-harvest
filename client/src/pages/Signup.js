import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/signup.css";

function Signup() {
  return (
    <div className="container mt-5 signup-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="text-center mb-4">Signup</h2>
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password" className="form-control" required />
                </div>
                <div className="form-group mt-3">
                  <label>Role</label>
                  <select className="form-control">
                    <option>Consumer</option>
                    <option>Farmer</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-custom mt-4 w-100">
                  Signup
                </button>
              </form>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="login-link">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
