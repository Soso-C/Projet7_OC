import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Default false si un input est sans error alors il deviendra true
  let validEmail = false;
  let validFullname = false;
  let validPassword = false;
  let validConfPassword = false;
  let validForm = false;

  // Affiche un message d'erreur dans la div sous l'input en question
  function displayError(tag, message) {
    tag.innerHTML = message;
  }

  // Target la balise sous l'input ou on injectera un message d'erreur si erreur.
  let fullnameErr = document.querySelector(".error-fullname");
  let emailErr = document.querySelector(".error-email");
  let passwordErr = document.querySelector(".error-password");
  let cPwdErr = document.querySelector(".error-confirmPwd");

  // usenavigate pour pouvoir de passé de sign-in a sign-up
  const navigate = useNavigate();

  function handleClick() {
    navigate("/sign-in");
  }

  // Func qui execute les checker d'inputs
  const validateForm = () => {
    fullnameChecker();
    emailChecker();
    passwordChecker();
    cPwdChecker();
  };

  // Regexp et validateur fullname input
  const fullnameChecker = () => {
    if (!fullname) {
      displayError(fullnameErr, "Votre nom et prénom sont requis !");
    } else if (fullname.length < 4) {
      displayError(
        fullnameErr,
        "Votre nom et prénom doivent contenir plus de 4 caractères !"
      );
    } else if (fullname.length > 40) {
      displayError(
        fullnameErr,
        "Votre nom et prénom doivent contenir moins de 40 caractères !"
      );
    } else if (!fullname.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      displayError(
        fullnameErr,
        "Pas de caractère spéciale et un espace entre le nom et prénom"
      );
    } else {
      displayError(fullnameErr, "");
      validFullname = true;
    }
  };

  // Regexp et validateur pwd input
  const passwordChecker = () => {
    if (!password) {
      displayError(passwordErr, "Votre mot de passe est requis !");
    } else if (password.length < 8) {
      displayError(passwordErr, "8 caractères ou plus sont requis !");
    } else if (password.length > 50) {
      displayError(
        passwordErr,
        "Votre mot de passe doit contenir moins de 50 caractères !"
      );
    } else if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)) {
      displayError(
        passwordErr,
        "Votre mot de passe doit contenir une majuscule, une lettre et un nombre"
      );
    } else {
      displayError(passwordErr, "");
      validPassword = true;
      console.log("Etape 1");
    }
  };

  // Verifie si password est égale ou pas a confirm pwd
  const cPwdChecker = () => {
    if (passwordConfirm !== password) {
      displayError(cPwdErr, "Pwd pas identique ");
      displayError(passwordErr, "Pwd pas identique ");
    } else {
      validConfPassword = true;
      displayError(cPwdErr, "");
      displayError(passwordErr, "");
    }
  };

  // Email checker
  const emailChecker = () => {
    if (
      !email.match(
        "^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "g"
      )
    ) {
      displayError(emailErr, "Merci de remplir un email valide !");
    } else {
      validEmail = true;
      displayError(emailErr, "");
    }
  };

  // Post du form a notre base de données si il y a pas d'erreur.

  function sendForm(e) {
    e.preventDefault();

    validateForm();

    console.log(validConfPassword, validPassword, validEmail, validFullname);

    if (validConfPassword && validEmail && validFullname) {
      validForm = true;
      console.log(validForm);
    }

    if (validForm) {
      console.log(validForm);
      Axios.post("http://localhost:3001/api/user/signup", {
        email: email,
        password: password,
        fullname: fullname,
      })
        .then((res) => {
          window.location.href = "/sign-in";
          alert("Compte créé avec succes veuillez vous connecter !");
        })
        .catch();
    }
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
                setEmail(e.target.value);
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
                setPassword(e.target.value);
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
                setPasswordConfirm(e.target.value);
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
