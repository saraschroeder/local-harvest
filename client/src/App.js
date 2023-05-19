import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Home";
import About from "./pages/About";
import Profile from "./components/FarmerProfile";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
