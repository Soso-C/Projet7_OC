import React from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false)

  // Navigate de sign-in to sign-up

  let navigate = useNavigate();

  function handleClick() {
    navigate("/sign-up");
  }


  // Func qui va controler si notre email / pwd sont existant et valide dans notre base de données si oui alors on sera log si non non.

  function loginData(e) {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/user/login", {
      email: email,
      password: password,
    })
    .then(res => {
      window.location.href = '/'
      alert("Connexion réussie")
    })
    .catch()
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <h3 className="loginLogo">Groupomania</h3>
          <span className="loginDesc">
            Avec Groupomania, partagez et restez en contact avec votre
            entreprise
          </span>
        </div>
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
