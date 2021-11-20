import React from "react";
import "./Header.css";
import logo from "../assets/Groupomania_Logos/icon5.png";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="header_container">
      <img id="logo" src={logo} alt="logo groupomania" />
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
