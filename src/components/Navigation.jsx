import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="bg-orange-500 p-5 pb-1 text-white font-Nunito font-bold">
      <nav>
        <ul className="flex justify-evenly">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/history">About</Link>
          </li>
          <li>
            <Link to="/tools">Tools</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
