import React from "react";
import { useState } from "react";
import "./ProfilEdit.css";
import Axios from "axios";
import ProfileMain from "./ProfileMain/ProfileMain";

//Material ui
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ProfilEdit(props) {

  const [edit, isEdit] = useState(props.edit)
  const [username, setUsername] = useState("Edit Profile Name");
  const [bio, setBio] = useState("Bio");
  const [work, setWork] = useState("Developpeur Web");
  const [country, setCountry] = useState("France");
  const [age, setAge] = useState(25);
  const [urlGit, setUrlGit] = useState("https://github.com/Soso-C/Projet7_OC");

  const closeEdit = () => {
    // isEdit(false)
  };

  const uploadProfil = () => {};

  return (
    <div className="Profile">
      <div className="profileContainer">
        <div className="pictureAndName">
          <div className="avatarPic"></div>
          <input
            className="profileName"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="bioAndInfoContainer">
          <div className="bioContainer">
            <span className="bioTitle">Biographie :</span>
            <textarea
              id="userBio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </div>
          <div className="infoContainer">
            <span className="infoTitle">Information :</span>
            <p>
              Métier :
              <input
                id="inputMetier"
                type="text"
                value={work}
                onChange={(e) => {
                  setWork(e.target.value);
                }}
              />
            </p>
            <p>
              Pays :
              <input
                id="inputPays"
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
            </p>
            <p>
              Age :
              <input
                id="inputAge"
                type="text"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </p>
            <p>
              GitHub :
              <input
                id="inputGit"
                type="text"
                value={urlGit}
                onChange={(e) => {
                  setUrlGit(e.target.value);
                }}
              />
            </p>
          </div>
        </div>
        <div className="btnEditAndCancel">
          <IconButton id="cancelIcon" onClick={closeEdit}>
            <CancelIcon />
          </IconButton>
          <p>Annuler</p>
          <IconButton>
            <SaveIcon id="saveIcon" onClick={uploadProfil}/>
          </IconButton>
          <p>Sauvegarder</p>
        </div>
      </div>
    </div>
  );
}
