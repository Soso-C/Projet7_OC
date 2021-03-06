import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";
import { postSchema } from "../../../Validation/ValidForms";

// Material ui
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

const Input = styled("input")({
  display: "none",
});

export default function MakePost() {
  let test1 = JSON.parse(localStorage.getItem("token"));
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();

  // nom pour la var fileName qui créer notre image dans le back avec
  const nameFile = `post${test1.userId}`;

  // Envoyer la data a la DB
  const sendData = async () => {
    const data = new FormData();

    data.append("file", file);
    data.append("name", nameFile);
    data.append("title", title);
    data.append("userId", test1.userId);

    // si title < 70 alors on peut faire la request pour créer notre post
    if (title.length < 70){
      Axios.post(`${process.env.REACT_APP_API_URL}/api/post/`, data, {
      headers: { Authorization: `Bearer ${test1.token}` },
    })
      .then((res) => {
        alert("Publication créée avec succes !");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });

    }else (
      alert("70 caractères maximum")
    )
    
  };

  return (
    <div>
      <div className="container">
        <div className="wraper-left">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo">
                S
              </Avatar>
            }
          />
          <textarea
            id="textareaPost"
            placeholder="Importer une image et écrivez du texte ici !"
            rows="20"
            cols="40"
            aria-autocomplete="list"
            aria-haspopup="true"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <span id="borderPost"></span>
        <div className="wrapper-right">
          <label htmlFor="icon-button-file">
            <Input
              accept=".jpg, .jpeg, .png, .gif"
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              id="icnBtnPhoto"
            >
              <PhotoCamera />
            </IconButton>
            <span className="iconPhotoT">Image</span>
          </label>
          <label htmlFor="icon-button-video">
            <IconButton
              color="primary"
              aria-label="video import"
              component="span"
              id="icnBtnVideo"
            >
              <VideoCameraBackIcon />
            </IconButton>
            <span className="iconVideoT">Video</span>
          </label>
          <label htmlFor="icon-button-live" onClick={sendData}>
            <span className="iconLiveT">Publier</span>
            <IconButton
              color="primary"
              aria-label="send"
              component="span"
              id="icnBtnLive"
            >
              <SendIcon />
            </IconButton>
          </label>
        </div>
      </div>
    </div>
  );
}
