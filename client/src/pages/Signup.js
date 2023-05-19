import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/signup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const Signup = () => {
  // Set initial role state
  const [userRole, setUserRole] = useState("");
  // Set initial form state
  const [formState, setFormState] = useState({
    email: "",
    userName: "",
    password: "",
    role: "",
    businessName: "",
    location: "",
    description: ""
  });

// Using mutation to create new user
  const [createUser, {error}] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
   
    try {
      const { data } = await createUser({
        variables: { input: formState },
      });
console.log(data)
console.log(error);
      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: "",
      userName: "",
      password: "",
      role: "",
      businessName: "",
      location: "",
      description: ""
  })
  };

  return (
    <div className="container mt-5 signup-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="text-center mb-4">Signup</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Username</label>

                  <input
                    type="text"
                    name="userName"
                    value={formState.userName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-3  custom-select-role">
                  <label>Please select your role:</label>
                  <select
                    className="form-control"
                    value={userRole}
                    name="role"
                    onChange={(e) => {
                      setUserRole(e.target.value);
                      handleChange(e);
                    }}
                  >
                    <option>Consumer</option>
                    <option>Farmer</option>
                  </select>
                </div>
                {userRole === "Farmer" && (
                  <div>
                    <div className="form-group">
                      <label>Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formState.businessName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formState.location}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                )}
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
