import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from '@mui/material/styles';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import IconButton from "@mui/material/IconButton";
import LiveTvIcon from '@mui/icons-material/LiveTv';


const Input = styled('input')({
  display: 'none',
});


export default function MakePost() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const nameFile = "random_name"


  const sendPost = () => {

    const data = new FormData();

    data.append("file", file)
    data.append("name", nameFile)
    data.append("title", title)

    Axios.post("http://localhost:3001/api/post/upload", data)
    .then((res) => {
      alert("Publication créée avec succes !");
      window.location.reload();
    })
    .catch(err => {
      alert("Post non envoyée")
    })
  };

  return (
    <div>
      <div className="container" enctype="multipart/form-data">
        <div className="wraper-left">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo">
                S
              </Avatar>
            }
          />
          <textarea
            placeholder="Dites nous quelque chose de cool"
            rows="20"
            cols="40"
            autocomplete="off"
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
          <label htmlFor="icon-button-file" className="icnBtnPhoto">
            <Input accept=".jpg, .jpeg, .png" id="icon-button-file" type="file" onChange={(e) => {
                setFile(e.target.files[0]);
              }}/>
            <IconButton color="primary" aria-label="upload picture" component="span" >
              <PhotoCamera />
            </IconButton>
            <span className="iconPhotoT">Image</span>
          </label>
          <label htmlFor="icon-button-video" className="icnBtnVideo">
            <IconButton color="primary" aria-label="video import" component="span" >
                <VideoCameraBackIcon />
              </IconButton>
              <span className="iconVideoT">Video</span>
          </label>
          <label htmlFor="icon-button-live" className="icnBtnlive">
            <IconButton color="primary" aria-label="live now" component="span" >
              <LiveTvIcon />
            </IconButton>
            <span className="iconLiveT">Live</span>
          </label>
          <Button
            variant="contained"
            className="btnTweet"
            onClick={sendPost}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
