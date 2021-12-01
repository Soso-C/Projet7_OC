import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function MakePost() {
  const [title, setTitle] = useState("");
  const [imgInput, setImgInput] = useState("");
  const [validTitle, setValidTitle] = useState(false);

  const titleError = document.getElementById("postTitleError")

  const sendPost = () => {

    postChecker();

    if (validTitle) {

      Axios.post("http://localhost:3001/api/post/", {
        title: title,
        img: imgInput,
      }).then((res) => {
        alert("Publication créée avec succes !");
        window.location.reload();
      });

    } else {
      alert("Remplir correctement le message svp")
    }

    
  };

  const postChecker = () => {
    if (title.length < 5) {
      titleError.innerHTML = "Veuillez rentrez au minimum 5 caracteres !"
    }else {
      titleError.innerHTML = ""
      validTitle(true);
    }
  }


  return (
    <div>
      <div className="container">
        <div className="wraper-left">
          <CardHeader 
             avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo">
                S
              </Avatar>}
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
          <input
            className="imgUrl"
            placeholder="Image url"
            type="text"
            value={imgInput}
            onChange={(e) => {
              setImgInput(e.target.value);
            }}
          />          
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
