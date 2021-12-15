import React from "react";
import Axios from "axios";
import { useState } from "react";
import "./MakeComment.css"

// Material ui
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

export default function MakeComment(props) {

  let test1 = JSON.parse(localStorage.getItem("token"));
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState(props.postId)

  const sendCom = () => {
    Axios.post("http://localhost:3001/api/post/comment-post", {
      pId: postId,
      comment: comment
    }, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      alert("Commentaire envoyée !")
      window.location.href = "/"
    }).catch((err) => {
      alert(err.response.data.error)
    })
  };

  return (
    <div>
      <div className="comContainer">
        <div className="makeComContainer">
          <div className="comAvatarAndDate">
          </div>
          <input
            type="text"
            placeholder="Ecrivez un commentaire ..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <IconButton onClick={sendCom}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
