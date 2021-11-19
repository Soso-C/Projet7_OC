import React from 'react';
import "../../styles/Register.css"

const Register = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginTop">
                    <h3 className="loginLogo">Groupomania</h3>
                    <span className="loginDesc">Avec Groupomania, partagez et restez en contact avec votre entreprise</span>
                </div>
                <div className="loginBottom">
                    <div className="loginBox">
                        <input placeholder="Nom Prénom" id="inputLogin" type="text" />
                        <input placeholder="Adresse Email" id="inputLogin" type="email"/>
                        <input placeholder="Mot de passe" id="passwordLogin" type="password"/>
                        <input placeholder="Confirmer Mot de Passe" id="passwordLogin" type="password"/>
                        <button className="signUpButton">Créer un compte</button>
                        <span id="notRegistered"></span>
                        <button className="signInButton">Se Connecter</button>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default Register;