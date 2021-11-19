import "../../styles/Register.css"
import { useNavigate } from "react-router-dom";

const Register = () => {    

    let navigate = useNavigate();

    function handleClick() {navigate("/");}
    function sendForm(e) {
        e.preventDefault();
        }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginTop">
                    <h3 className="loginLogo">Groupomania</h3>
                    <span className="loginDesc">Avec Groupomania, partagez et restez en contact avec votre entreprise</span>
                </div>
                <div className="loginBottom">
                    <form type="submit" className="registerBox">
                        <input placeholder="Nom Prénom" id="inputLogin" type="text" required/>
                        <input placeholder="Adresse Email" id="inputLogin" type="email" required/>
                        <input placeholder="Mot de passe" id="passwordLogin" type="password" required/>
                        <input placeholder="Confirmer Mot de Passe" id="passwordLogin" type="password" required/>
                        <button className="signUpButton" type="submit" onSubmit={sendForm}>Créer votre compte</button>
                        <span id="notRegistered"></span>
                        <button className="signInButton" onClick={handleClick}>Se Connecter</button>
                    </form>
                </div>    
            </div>
        </div>
    );
};

export default Register;