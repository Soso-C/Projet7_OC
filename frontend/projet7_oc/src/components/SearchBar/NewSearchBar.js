import React from "react";
import "./NewSearchBar.css";
import { Link } from "react-router-dom";

// Material UI import
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

let test1 = JSON.parse(localStorage.getItem("token"));

export default function NewSearchBar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
  };

  return (
    <div>
      <div className="navContainer">
        <div className="logo">
          <h2>Groupomania</h2>
        </div>
        <div className="HiUsername">
          <p>Bonjour, {test1.username}</p>
        </div>
        <div className="iconsContainer">
          <Link to="/">
            <IconButton size="medium" id="iconNavWhite">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/profil/mon-profil">
            <IconButton size="medium" id="iconNavWhite">
              <AccountCircle />
            </IconButton>
          </Link>
          <Link to="/sign-in">
            <IconButton size="medium" id="iconNavWhite" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
