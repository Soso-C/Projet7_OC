import React from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import Axios from "axios";
import { useState } from "react";
import logo from "../../assets/Groupomania_Logos/icon5Svg.svg";
import { loginSchema } from "../../Validation/ValidForms";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate de sign-in to sign-up

  let navigate = useNavigate();

  function handleClick() {
    navigate("/sign-up");
  }

  // Variable de nos div(err) sous l'input
  let emailErr = document.querySelector(".error-email");
  let passwordErr = document.querySelector(".error-password");

  // Target les inputs
  let passwordInput = document.getElementById("password");
  let emailInput = document.getElementById("email");

  // Affiche les erreurs
  function displayError(tag, message) {
    tag.innerHTML = message;
  }

  // Clear les erreurs
  const clearErr = () => {
    // clear les message d'erreur
    passwordErr.innerHTML = "";
    emailErr.innerHTML = "";

    // clear les inputs
    emailInput.classList.remove("errorInput");
    passwordInput.classList.remove("errorInput");
  };

  // Appel a notre API, si notre PWD/Email sont valide alors on sera log et on recup notre token

  async function loginData(e) {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    // Retourne les erreurs de notre schema yup et les affiche sous l'input en question
    const validate = await loginSchema.validate(formData).catch((err) => {
      if (err.errors[0].email) {
        clearErr();
        displayError(emailErr, err.errors[0].email);
        emailInput.classList.add("errorInput");
      } else if (err.errors[0].password) {
        clearErr();
        displayError(passwordErr, err.errors[0].password);
        passwordInput.classList.add("errorInput");
      } else {
        clearErr();
      }
    });

    // Si mes inputs ont aucune erreur et que isValid est true alors on fait une request pour créer l'user
    const isValid = await loginSchema.isValid(formData).then((valid) => {
      if (valid) {
        clearErr();
        Axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, formData)
          .then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data));
            alert("Connexion réussie");
            window.location.href = "/";
          })
          .catch((err) => {
            if (err.response) {
              alert(err.response.data.error);
              passwordInput.classList.add("errorInput");
              emailInput.classList.add("errorInput");
            } else {
              alert("Ip bloquée 15 minutes trop de request");
            }
          });
      }
    });
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <img className="loginLogo" src={logo} alt="logo groupomania" />
        </div>
        <span className="loginDesc">
          Avec Groupomania, partagez et restez en contact avec votre entreprise
        </span>
        <form action="/" className="loginBottom" onSubmit={loginData}>
          <div className="loginBox">
            <input
              id="email"
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
              id="password"
              placeholder="Mot de Passe"
              className="inputLogin"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
