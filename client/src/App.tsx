import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/header";

import "./App.css";


function App() {
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
