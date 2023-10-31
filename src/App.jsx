// import { useState } from 'react'
import "./App.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Map from "./components/home/Map";
import Parkings from "./components/home/Parking";
import Login from "./components/SignUp/Login/Login";
import Register from "./components/SignUp/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <div>
                <Header />
                <Navigation />
                <Map />
                <Parkings />
              </div>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
