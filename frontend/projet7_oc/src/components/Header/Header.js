import React from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="header_container">
      <h1>Groupomania</h1>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
