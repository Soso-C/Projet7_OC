import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const validEmail = false;
  const validFullname = false;
  const validPassword = false;
  const isFormSubmited = false;

  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  function sendForm(e) {
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
        <div className="loginBottom">
          <form type="submit" className="registerBox">
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
            <button className="signUpButton" type="submit" onSubmit={sendForm}>
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
