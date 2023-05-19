import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Home from "./pages/Home";
import About from "./pages/About"; 

import "./App.css";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} /> 
      </Routes>
      <Footer />
    </Router>
    </ApolloProvider>
  );
}
export default App;
