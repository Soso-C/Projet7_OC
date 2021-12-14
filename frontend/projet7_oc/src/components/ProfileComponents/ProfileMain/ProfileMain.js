import React from "react";
import "./ProfileMain.css";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import Axios from "axios";

// Material UI
import GitHubIcon from "@mui/icons-material/GitHub";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function ProfileMain(props) {
  const test1 = JSON.parse(localStorage.getItem("token"));

  const user = props.user;
  const [isEdit, setIsEdit] = useState(false);

  // DB infos useState
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState(user.bio);
  console.log(bio);
  const [work, setWork] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [urlGit, setUrlGit] = useState("");

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
    Axios.put(
      `http://localhost:3001/api/user/${test1.userId}`,
      {
        fullname: username,
        bio: bio,
        country: country,
        metier: work,
        age: age,
        github: urlGit,
      },
      {
        headers: { Authorization: `Bearer ${test1.token}` },
      }
    ).then((res) => {
      alert("Profil mis a jour !");
      closeEdit();
      window.location.href = "/profil/mon-profil";
    });
  };


  // Delete Profile func

  const deleteUser = () => {
    Axios.delete(`http://localhost:3001/api/user/${test1.userId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      alert("Publication, commentaire et compte supprimée avec succes vous devez créé un nouveau compte pour vous connecter!");
      window.location.href = "/sign-up";
      localStorage.removeItem("token");
    });
  }

  // Si isEdit est true alors on affiche le editmode si non le profil basique
  return isEdit ? (
    <>
      <div className="Profile">
        <div className="profileContainer">
          <div className="pictureAndName">
            <div className="avatarPic" style={{ marginBottom: "2em" }}></div>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
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
              <div className="titleAndInputProfil">
                <p>Métier :</p>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={work}
                  onChange={(e) => {
                    setWork(e.target.value);
                  }}
                />
              </div>
              <div className="titleAndInputProfil">
                <p>Pays :</p>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
              <div className="titleAndInputProfil">
                <p>Age :</p>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
              <div className="titleAndInputProfil">
                <p>Git :</p>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  value={urlGit}
                  onChange={(e) => {
                    setUrlGit(e.target.value);
                  }}
                />
              </div>
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
                onClick={deleteUser}
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
          {user.id === test1.userId || test1.admin === 1 ? (
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
