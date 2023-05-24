import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/signup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { states } from "../utils/helpers";

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
    city: "",
    state: "",
    description: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setShowAvatarSelection(false);
    console.log(avatar);
  };

  // Using mutation to create new user
  const [createUser] = useMutation(CREATE_USER);

  // Set array values to user input when text area is no longer selected
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to create new user when Submit button is clicked
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedAvatar === "") {
      return alert("Please select an avatar.");
    }
    // Verify if role is Consumer and clears inputs exclusive to Farmer
    try {
      if (userRole === "Consumer") {
        const { data } = await createUser({
          variables: {
            input: {
              ...formState,
              ...{ businessName: "", city: "", state: "", description: "" },
              image: selectedAvatar,
            },
          },
        });

        // Create JWT token for Consumer
        Auth.login(data.createUser.token);
        // If role is Farmer, all input can be passed with their value to createUser mutation
      } else if (userRole === "Farmer") {
        const { data } = await createUser({
          variables: { input: { ...formState, image: selectedAvatar } },
        });
        // Create JWT token for Farmer
        Auth.login(data.createUser.token);
        // Clears form
        setFormState({
          email: "",
          userName: "",
          password: "",
          role: "",
          businessName: "",
          city: "",
          state: "",
          description: "",
        });
      }
    } catch (e) {
      console.error(e);
      // If returns error of duplicate email, show alert
      if (e.message.includes("duplicate key error")) {
        alert("This email is already in use");
        // Show alert of any other errors that may occur
      } else {
        alert("An error has occurred. Please try again.");
      }
    }
  };

  const toggleAvatarSelection = () => {
    setShowAvatarSelection(!showAvatarSelection);
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
                    // Email validation
                    pattern="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$"
                    // Shows alert if validation fails
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Please use this format: 'email@example.com'"
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
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
                    value={formState.role}
                    name="role"
                    onChange={(e) => {
                      setUserRole(e.target.value);
                      handleChange(e);
                    }}
                  >
                    <option value=""></option>
                    <option value="Consumer">Consumer</option>
                    <option value="Farmer">Farmer</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="button"
                    className="btn btn-custom"
                    onClick={toggleAvatarSelection}
                  >
                    Choose an Avatar
                  </button>
                </div>
                {showAvatarSelection && (
                  <div className="avatar-selection-box">
                    <div className="avatar-images">
                      {Array.from({ length: 15 }, (_, index) => {
                        const avatarNumber = index + 1;
                        const avatarPath = require(`../assets/images/avatars/av${avatarNumber}.png`);
                        return (
                          <img
                            key={avatarNumber}
                            src={avatarPath}
                            alt={`Avatar ${avatarNumber}`}
                            onClick={() => handleAvatarSelect(avatarPath)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* The below is shown if user selects Farmer as a role */}
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
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formState.city}
                        onChange={handleChange}
                        className="form-control"
                        required
                        // City validation
                        pattern="^[A-Za-z\s]+"
                        // Shows alert if validation fails
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "Please enter a valid city name"
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <select
                        name="state"
                        value={formState.state}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select a State</option>
                        {states.map((state) => (
                          <option key={state.abbr} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
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
                {/* If role selected is consumer, closes the above */}
                {userRole === "Consumer" && <></>}
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
};

export default Signup;
