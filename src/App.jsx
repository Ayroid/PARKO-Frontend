import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
