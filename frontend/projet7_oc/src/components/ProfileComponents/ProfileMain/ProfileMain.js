import React from "react";
import "./ProfileMain.css";
import { useState } from "react";
import ProfilEdit from "../ProfilEdit";

import GitHubIcon from "@mui/icons-material/GitHub";

export default function ProfileMain() {

  const [edit, isEdit] = useState(false);
  const [username, setUsername] = useState("Edit Profile Name");
  const [bio, setBio] = useState("Bio");
  const [work, setWork] = useState("Developpeur Web");
  const [country, setCountry] = useState("France");
  const [age, setAge] = useState(25);
  const [urlGit, setUrlGit] = useState("https://github.com/Soso-C/Projet7_OC");


  return edit ? (
    <ProfilEdit edit={edit}/>
  ) : (
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
