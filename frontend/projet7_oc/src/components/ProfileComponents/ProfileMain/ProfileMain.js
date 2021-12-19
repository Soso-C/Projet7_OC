import React from "react";
import "./ProfileMain.css";
import { useState } from "react";
import { dateParser } from "../../../utils/Utils";
import Axios from "axios";
import { editProfilSchema } from "../../../Validation/ValidForms";

// Material UI
import GitHubIcon from "@mui/icons-material/GitHub";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";

export default function ProfileMain(props) {
  const test1 = JSON.parse(localStorage.getItem("token"));

  const user = props.user;

  // Si true alors on passe en Edit mode
  const [isEdit, setIsEdit] = useState(false);

  // DB infos useState (marche pas je sais pas pourquoi le state prend pas en compte ma data)
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [work, setWork] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState(18);
  const [urlGit, setUrlGit] = useState("");

  // Passe a false la partie edit
  const closeEdit = () => {
    setIsEdit(false);
  };

  // Passe a true la partie edit
  const openEdit = () => {
    setIsEdit(true);
  };

  // Envoie la data a la DB pour upload le profil
  const uploadProfil = async () => {
    // la data qu'on va envoyé a notre DB
    let formData = {
      fullname: username,
      bio: bio,
      country: country,
      metier: work,
      age: age,
      github: urlGit,
    };

    // return les erreurs en alert
    const validate = await editProfilSchema.validate(formData).catch((err) => {
      alert(Object.values(err.errors[0]));
    });

    // si schema est valid sans erreur alors on envoie le form et on update le profile
    const isValid = await editProfilSchema
      .isValid(formData)
      .then((valid) => {
        if (valid) {
          Axios.put(
            `http://localhost:3001/api/user/${test1.userId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${test1.token}` },
            }
          ).then((res) => {
            alert("Profil mis a jour !");
            closeEdit();
            window.location.href = "/profil/mon-profil";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Profile func

  const deleteUser = () => {
    Axios.delete(`http://localhost:3001/api/user/${test1.userId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    })
      .then((res) => {
        alert(
          "Publication, commentaire et compte supprimée avec succes vous devez créer un nouveau compte pour vous connecter!"
        );
        window.location.href = "/sign-up";
        localStorage.removeItem("token");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  /****************************************************************************** Modal Confirmation Delete  ***************************************************************************/
  const Modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*************************************************************************************************************************************************************************************/

  // Si isEdit est true alors on affiche le EditMode si non le profil basique
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
                <span className="testErr"></span>
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
                onClick={handleOpen}
              >
                Supprimer
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={Modalstyle}>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, pb: 5 }}
                  >
                    Voulez vous vraiment supprimer votre compte ?
                  </Typography>
                  <Stack id="deleteModalConfirmOrCancelContainer">
                    <Button
                      variant="contained"
                      startIcon={<CancelIcon />}
                      color="error"
                      onClick={handleClose}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<CheckIcon />}
                      color="success"
                      onClick={deleteUser}
                    >
                      Confirmer
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    /*******************************************************************  Fin du Edit Mode ici ***************************************************************************************/
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
            <span id="createdAt">
              Membre depuis : {dateParser(user.user_created)}
            </span>
          </div>
          <div className="infoContainer">
            <span className="infoTitle">Information :</span>
            <p>Métier : {user.metier}</p>
            <p>Pays : {user.country}</p>
            <p>Age : {user.age != null ? `${user.age}  ans` : ""}</p>
            <div className="socialWrapper">
              <p>GitHub :</p>
              <IconButton
                href={user.github_url}
                id="githubLink"
                size="medium"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
