import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/login.css";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error}] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container mt-5 login-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card login-card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-custom mt-4 w-100"
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </button>
                </form>
              {error && (
                <div className="text-danger mt-3">{error.message}</div>
              )}
              <div className="text-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="signup-link">
                    Signup
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

export default Login;
