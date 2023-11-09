// import { useState } from 'react'
import "./App.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Map from "./components/home/Map";
import Parkings from "./components/home/Parking";
import SignUp from "./components/SignUp/SignUp";

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
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
