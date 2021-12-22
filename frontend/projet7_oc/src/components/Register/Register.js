import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerSchema } from "../../Validation/ValidForms";
import Axios from "axios";
import logo from "../../assets/Groupomania_Logos/icon5Svg.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // usenavigate pour pouvoir de passé de sign-in a sign-up
  const navigate = useNavigate();

  // Navigate to sign-in
  function handleClick() {
    navigate("/sign-in");
  }

  /**************************************************************************** Gestion d'erreur inputs **************************************************************************/

  // Affiche un message d'erreur dans la div sous l'input en question
  function displayError(tag, message) {
    tag.innerHTML = message;
  }

  // Clear les erreurs
  const clearErr = () => {
    nameErr.innerHTML = "";
    lastnameErr.innerHTML = "";
    passwordErr.innerHTML = "";
    emailErr.innerHTML = "";
    cPwdErr.innerHTML = "";
  };

  // Target la balise sous l'input ou on injectera un message d'erreur si erreur.
  let nameErr = document.querySelector(".error-name");
  let lastnameErr = document.querySelector(".error-lastname");
  let emailErr = document.querySelector(".error-email");
  let passwordErr = document.querySelector(".error-password");
  let cPwdErr = document.querySelector(".error-confirmPwd");

  /**********************************************************************************************************************************************************************************/

  // Post du form a notre base de données si il y a pas d'erreur.

  const sendForm = async (e) => {
    e.preventDefault();

    let formData = {
      name,
      lastname,
      email,
      password,
      confirmPassword,
    };

    // Retourne les erreurs de notre schema yup et les affiche sous l'input en question
    const validate = await registerSchema.validate(formData).catch((err) => {
      if (err.errors[0].name) {
        clearErr();
        displayError(nameErr, err.errors[0].name);
      } else if (err.errors[0].lastname) {
        clearErr();
        displayError(lastnameErr, err.errors[0].lastname);
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
        console.log(err.errors);
      }
    });

    // Si mes inputs ont aucune erreur et que isValid est true alors on fait une request pour créer l'user
    const isValid = await registerSchema
      .isValid(formData)
      .then((valid) => {
        if (valid) {
          Axios.post("http://localhost:3001/api/user/signup", formData)
            // si ok alors on récupere le token on le stock dans le localStorage et on connecte l'user et le redirige vers "/"
            .then((res) => {
              localStorage.setItem("token", JSON.stringify(res.data));
              alert("Compte créé avec succes, Bienvenu sur Groupomania!");
              window.location.href = "/";
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
    <div className="register">
      <div className="registerWrapper">
        <div className="loginTop">
          <img className="registerLogo" src={logo} alt="logo groupomania" />
        </div>
        <span className="loginDesc">
          Avec Groupomania, partagez et restez en contact avec votre entreprise
        </span>
        <div className="loginBottom">
          <form className="registerBox" onSubmit={sendForm}>
            <div className="nameLnameContainer">
              <div className="prenomContainer">
                <input
                  placeholder="Prénom"
                  className="inputLogin nameLastnInput"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <div className="error-name"></div>
              </div>
              <div className="nomContainer">
              <input
                placeholder="Nom"
                className="inputLogin nameLastnInput"
                type="text"
                id="lname"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                required
              />
              <div className="error-lastname"></div>
              </div>
            </div>
            <div className="errorNameLastname">
            </div>
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
