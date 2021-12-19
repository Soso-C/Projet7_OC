import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerSchema } from "../../Validation/ValidForms";
import * as yup from "yup";
import Axios from "axios";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  // Affiche un message d'erreur dans la div sous l'input en question
  function displayError(tag, message) {
    tag.innerHTML = message;
  }

  // Clear les erreurs
  const clearErr = () => {
    fullnameErr.innerHTML = "";
    passwordErr.innerHTML = "";
    emailErr.innerHTML = "";
    cPwdErr.innerHTML = "";
  };

  // Target la balise sous l'input ou on injectera un message d'erreur si erreur.
  let fullnameErr = document.querySelector(".error-fullname");
  let emailErr = document.querySelector(".error-email");
  let passwordErr = document.querySelector(".error-password");
  let cPwdErr = document.querySelector(".error-confirmPwd");

  // usenavigate pour pouvoir de passé de sign-in a sign-up
  const navigate = useNavigate();

  // Navigate to sign-in
  function handleClick() {
    navigate("/sign-in");
  }


  // Post du form a notre base de données si il y a pas d'erreur.

  const sendForm = async (e) => {
    e.preventDefault();

    let formData = {
      fullname,
      email,
      password,
      confirmPassword,
    };

    // Retourne les erreurs des inputs sous l'input en question
    const validate = await registerSchema.validate(formData).catch((err) => {
      if (err.errors[0].fullname) {
        clearErr();
        displayError(fullnameErr, err.errors[0].fullname);
      } else if (err.errors[0].password) {
        clearErr();
        displayError(passwordErr, err.errors[0].password);
      } else if (err.errors[0].email) {
        clearErr();
        displayError(emailErr, err.errors[0].email);
      } else if (err.errors[0].cpassword) {
        clearErr();
        displayError(cPwdErr, err.errors[0].cpassword);
      } else {
        clearErr();
      }
      console.log(err.errors);
    });

    // Si mes inputs ont aucune erreurs et que isValid est true alors on fais une request pour créer l'user
    const isValid = await registerSchema
      .isValid(formData)
      .then((valid) => {
        if (valid) {
          Axios.post("http://localhost:3001/api/user/signup", formData)
            .then((res) => {
              navigate("/sign-in");
              alert("Compte créé avec succes veuillez vous connecter !");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <form className="registerBox" onSubmit={sendForm}>
            <input
              placeholder="Nom Prénom"
              className="inputLogin"
              type="text"
              id="fname"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
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
            />
            <div className="error-password"></div>
            <input
              placeholder="Confirmer Mot de Passe"
              className="inputLogin"
              type="password"
              id="cpassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
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
