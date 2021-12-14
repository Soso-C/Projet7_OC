import React from "react";
import "./ProfileMain.css";
import { useState} from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

// Material UI
import GitHubIcon from "@mui/icons-material/GitHub";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ProfileMain(props) {

  const test1 = JSON.parse(localStorage.getItem("token"));
  const params = useParams();
  const user = props.user

  console.log(user);

  const [isEdit, setIsEdit] = useState(false);

  // DB infos  useState
  const [username, setUsername] = useState("Edit Profile Name");
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("Developpeur Web");
  const [country, setCountry] = useState("France");
  const [age, setAge] = useState(25);
  const [urlGit, setUrlGit] = useState("https://github.com/Soso-C/Projet7_OC");

  // Passe a false la partie edit
  const closeEdit = () => {
    setIsEdit(false);
  };

  // Passe a true la partie edit
  const openEdit = () => {
    setIsEdit(true);
  };

  // Envoie la data a la DB pour upload le profile
  const uploadProfil = () => {
    Axios.post();
  };

  return isEdit ? (
    <>
      <div className="Profile">
        <div className="profileContainer">
          <div className="pictureAndName">
            <div className="avatarPic"></div>
            <input
              className="profileInputName"
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
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={closeEdit}
                color="error"
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={uploadProfil}
              >
                Sauvegarder
              </Button>
            </Stack>
          </div>
          <div className="deleteUserContainer">
            <span className="deleteUser">
              Supprimer votre compte Groupomania
            </span>
            <div className="deleteUserWrapper">
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                color="error"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="Profile">
      <div className="profileContainer">
        <div className="pictureAndName">
          <div className="avatarPic"></div>
          <p className="profileName">{user.fullname}</p>
          {user.id === test1.userId || test1.admin === 1  ? (
            <div className="editProfile">
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={openEdit}
              >
                Modifier
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="bioAndInfoContainer">
          <div className="bioContainer">
            <span className="bioTitle">Biographie :</span>
            <p className="userBio">{user.bio}</p> 
          </div>
          <div className="infoContainer">
            <span className="infoTitle">Information :</span>
            <p>Métier : {user.metier}</p>
            <p>Pays : {user.country}</p>
            <p>Age : {user.age} ans</p>
            <div className="socialWrapper">
              <p>GitHub :</p>
              <a
                href={user.github_url}
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
