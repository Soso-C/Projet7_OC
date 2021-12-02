import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

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
      <form className="container" enctype="multipart/form-data">
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
        <span id="postTitleError"></span>
        <div className="wrapper-right">
          <label htmlFor="image">
            <input
              accept=".jpg, .jpeg, .png"
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
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
      </form>
    </div>
  );
}
