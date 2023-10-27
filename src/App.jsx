import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Header from './components/Header';
import Map from './components/home/Map';
import Parkings from './components/home/Parking';

function App() {

  return (
    <>
     <Header/>
      <Navigation/>
      <Map/>
      <Parkings/>
      
       
    </>
  )
}

export default App
