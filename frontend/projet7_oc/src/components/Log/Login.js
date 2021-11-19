import React from 'react';
import "../../styles/Login.css"

const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginTop">
                    <h3 className="loginLogo">Groupomania</h3>
                    <span className="loginDesc">Avec Groupomania, partagez et restez en contact avec votre entreprise</span>
                </div>
                <div className="loginBottom">
                    <div className="loginBox">
                        <input placeholder="Adresse email" id="inputLogin" />
                        <input placeholder="Mot de Passe" id="passwordLogin" />
                        <button className="loginButton">Connecter</button>
                        <span id="notRegistered"></span>
                        <button className="registerButton">Créer un compte</button>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default Login;