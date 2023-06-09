import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/FarmerProfile";
import { setContext } from "@apollo/client/link/context";

import "./App.css";
import CreatePost from "./pages/CreatePost";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-router">
        <Router>
          <div className="app-content">
          <Header />
          <div className="app-container">
          <Routes>
            <Route path="/profile/:farmerId" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="*" element={<Home />} />
          </Routes>
          </div>
          <Footer />
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}
export default App;
