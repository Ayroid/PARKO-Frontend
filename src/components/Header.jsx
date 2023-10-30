import React from "react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-orange-500 flex justify-between items-center pt-2 pl-5 pr-5 font-Nunito ">
      <h1 className="text-2xl font-bold text-white">Parko</h1>

      <div>
        <div className="flex justify-end ">
          <div
            className="three-dots cursor-pointer  text-xl p-0 5px text-white"
            onClick={toggleDropdown}
          >
            &#x2807;
          </div>
          <div
            className={`dropdown-container focus:outline-none ${
              isOpen ? "block" : "hidden"
            }`}
            tabIndex="-1"
            onBlur={() => setIsOpen(false)}
          >
            <div
              className="dropdown absolute right-10 bg-blue-600"
              style={{
                opacity: isOpen ? 1 : 0,
                zIndex: isOpen ? 100 : -1,
                maxHeight: isOpen ? "100vh" : 0,
              }}
            >
              <a href="#" className="text-white">
                <div className="p-2">dropdown 1</div>
              </a>
              <a href="#" className="text-white">
                <div className="p-2">dropdown 2</div>
              </a>
              <a href="#" className="text-white">
                <div className="p-2">dropdown 3</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
