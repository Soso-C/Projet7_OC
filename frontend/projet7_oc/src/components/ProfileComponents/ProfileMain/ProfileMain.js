import React from "react";
import "./ProfileMain.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";


export default function ProfileMain() {
    
  const [bio, setBio] = useState("");
  
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
            <p className="userBio">Une super bio</p>
          </div>
          <div className="infoContainer">
            <span className="infoTitle">Information :</span>
            <p>Métier : Developpeur web</p>
            <p>Pays : France</p>
            <p>Age : 25 ans</p>
            <div className="socialWrapper">
              <p>GitHub :</p>
              <a
                href="https://github.com/Soso-C/Projet7_OC"
                target="_blank"
                rel="noreferrer"
                className="githubLink"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
