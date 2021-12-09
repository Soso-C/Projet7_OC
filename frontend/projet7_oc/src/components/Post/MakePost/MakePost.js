import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";
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
  const [validTitle, setValidTitle] = useState(false);

  // nom pour la var fileName qui créer notre image dans le back avec
  const nameFile = "random_name";

  // Checker avant d'envoyer le post
  // const checkerPost = () => {
  //   if (title.length < 5) {
  //     alert("Vous devez avoir au moins 5 caracteres");
  //     setValidTitle(false);
  //   } else if (title.length > 200) {
  //     alert("200 caracteres max !");
  //     setValidTitle(false);
  //   } else {
  //     setValidTitle(true);
  //   }
  // };

  // Envoyer la data a la DB
  const sendData = () => {
    const data = new FormData();

    data.append("file", file);
    data.append("name", nameFile);
    data.append("title", title);
    data.append("userId", test1.userId)

    Axios.post("http://localhost:3001/api/post/upload", data, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      if (!res.data.message) {
        alert("Veuillez insérer une image");
      } else {
        alert("Publication créée avec succes !");
        window.location.reload();
      }
    });
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
            placeholder="Dites nous quelque chose de cool ici"
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
              accept=".jpg, .jpeg, .png"
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
