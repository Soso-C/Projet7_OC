import React from 'react'
import "./ProfileMain.css"

export default function ProfileMain() {
    return (
        <div className="Profile">
            <div className="profileContainer">
                <div className="pictureAndName">
                    <div className="avatarPic"></div>
                    <p className="profileName">Username Profile</p>
                </div>
                <div className="bioAndInfoContainer">
                    <div className="bioContainer">
                        <span className="bioTitle">Biographie :</span>
                        <p className="userBio">Bio ici</p>  
                    </div>
                    <div className="infoContainer">
                        <span className="infoTitle">Information :</span>
                        <p>Métier : Developpeur web</p>
                        <p>Pays : France</p>
                        <p>Age : 25 ans</p>
                        <span>Social : GitHub URL</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
