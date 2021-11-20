import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

const Register = () => {
  // variable use state
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const validEmail = false;
  const validFullname = false;
  const validPassword = false;
  const isFormSubmited = false;

  // variable qui injectera des messages d'erreurs si erreur sous le input en question.

  let fullnameErr = document.querySelector(".error-fullname");
  let emailErr = document.querySelector(".error-email");
  let passwordErr = document.querySelector(".error-password");
  let cPwdErr = document.querySelector(".error-confirmPwd");

  // usenavigate pour pouvoir de passé de sign-in a sign-up
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  function displayError(tag, message) {
    tag.innerHTML = message;
  }


  // Post du form a notre base de données
  function sendForm(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      displayError(passwordErr, "les mdp sont pas identique")
      displayError(cPwdErr, "les mdp sont pas identique")
    }

    Axios.post("http://localhost:3001/user/register", {
      email: email, 
      password: password, 
      fullname: fullname,
    }).then((res) => {
      console.log(res)
    })
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
        <div className="loginBottom">
          <form action="" className="registerBox" onSubmit={sendForm}>
            <input
              placeholder="Nom Prénom"
              className="inputLogin"
              type="text"
              id="fname"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              required
            />
            <div className="error-fullname"></div>
            <input
              placeholder="Adresse Email"
              className="inputLogin"
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
            }}
              required
            />
            <div className="error-email"></div>
            <input
              placeholder="Mot de passe"
              className="inputLogin"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
            }}
              required
            />
            <div className="error-password"></div>
            <input
              placeholder="Confirmer Mot de Passe"
              className="inputLogin"
              type="password"
              id="cpassword"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value)
            }}
              required
            />
            <div className="error-confirmPwd"></div>
            <button className="signUpButton" type="submit">
              Créer votre compte
            </button>
            <span id="notRegistered"></span>
            <button className="signInButton" onClick={handleClick}>
              Se Connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
