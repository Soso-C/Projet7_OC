import React from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import Axios from "axios";
import { useState } from "react";
import logo from "../../assets/Groupomania_Logos/icon5Svg.svg"


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate de sign-in to sign-up

  let navigate = useNavigate();

  function handleClick() {
    navigate("/sign-up");
  }

  const displayEror = (err) => {
    document.querySelector(".error-password").innerHTML = err;
  };

  // Appel a notre API, si notre PWD/Email sont valide alors on sera log et on recup notre token.

  function loginData(e) {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/user/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        alert("Connexion réussie");
        window.location.href = "/"    
      })
      .catch((err) => {
        displayEror(err.response.data.error);
      });
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <img className="loginLogo" src={logo}/>
        </div>
          <span className="loginDesc">
            Avec Groupomania, partagez et restez en contact avec votre
            entreprise
          </span>
        <form action="/" className="loginBottom" onSubmit={loginData}>
          <div className="loginBox">
            <input
              placeholder="Adresse Email"
              className="inputLogin"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <div className="error-email"></div>
            <input
              placeholder="Mot de Passe"
              className="inputLogin"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <div className="error-password"></div>
            <button className="loginButton">Connecter</button>
            <span id="notRegistered"></span>
            <button className="registerButton" onClick={handleClick}>
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
