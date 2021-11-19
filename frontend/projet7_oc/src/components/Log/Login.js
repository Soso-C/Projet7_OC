import React from "react";
import "../../styles/Login.css";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function handleClick() {
    navigate("/sign-up");
  }

  function loginData(e) {
    e.preventDefault();
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
        <form type="submit" className="loginBottom">
          <div className="loginBox">
            <input
              placeholder="Adresse email"
              className="inputLogin"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
            }}
              required
            />
            <div className="error-email"></div>
            <input
              placeholder="Mot de Passe"
              className="inputLogin"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
            }}
              required
            />
            <div className="error-password"></div>
            <button className="loginButton" onSubmit={loginData}>
              Connecter
            </button>
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
