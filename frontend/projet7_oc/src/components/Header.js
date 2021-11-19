import React from 'react';
import "../styles/Header.css";
import logo from '../assets/Groupomania_Logos/icon5.png';


const Header = () => {
    return (
        <div className="header_container">  
            <img id="logo" src={logo} alt="logo groupomania" /> 
            <div>
                <a>Accueil</a>
                <a>Profil</a> 
            </div>
               
        </div>
    );
};

export default Header;