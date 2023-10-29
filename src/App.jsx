import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Header from './components/Header';
import Map from './components/home/Map';
import Parkings from './components/home/Parking';
import Login from './components/SignUp/Login';
import Register from './components/SignUp/Register';

function App() {

  return (
    <>
     {/* <Header/>
      <Navigation/>
      <Map/>
      <Parkings/> */}

      {/* <Register/>       */}
      <Login/>
       
    </>
  )
}

export default App
