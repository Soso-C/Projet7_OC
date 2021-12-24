import React from "react";
import "./NewSearchBar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";


// Material UI import
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

let test1 = JSON.parse(localStorage.getItem("token"));

export default function NewSearchBar() {


  const [userData, setUserData] = useState([]);

  // On récupere le pseudo de l'user via l'id du token pour pouvoir l'afficher dans notre navbar ainsi le met bien a jour lorsque l'user change de pseudo aulieu d'utilisé le localStorage.
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/user/${test1.userId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      setUserData(res.data[0].prenom)
    });
  }, [test1.token, test1.userId]);



  // Clear le local storage et redirige l'user sur la page de connection
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign-in";
  };

  return (
    <>
      <nav className="navContainer">
        <div className="logo">
          <h2>Groupomania</h2>
        </div>
        <div className="HiUsername">
          <p>Bonjour, {userData}</p>
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
      </nav>
    </>
  );
}
