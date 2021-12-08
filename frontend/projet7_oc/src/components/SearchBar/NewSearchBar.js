import React from "react";
import "./NewSearchBar.css"
import { Link } from "react-router-dom";

// Material UI import
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

let test1 = JSON.parse(localStorage.getItem("token"));

export default function NewSearchBar() {

  const logout = () =>  {

    localStorage.removeItem("token")
    window.location.href = "/sign-in"

  }

  return (
    <div>
      <div className="navContainer">
        <div className="logo">
        <h2>Groupomania</h2>
        </div>
        <div className="HiUsername">
          {/* <p>Bonjour, {test1.username}</p> */}
        </div>
        <div className="logoContainer">
          <Link to="/" className="icon"><HomeIcon sx={{ fontSize: 30 }}/></Link>
          <Link to="/profil/me" className="icon"><AccountCircle sx={{ fontSize: 30 }}/></Link>
          <Link to="/sign-in" className="icon"><LogoutIcon sx={{ fontSize: 30 }} onClick={logout}/></Link>
        </div>
      </div>
    </div>
  );
}
