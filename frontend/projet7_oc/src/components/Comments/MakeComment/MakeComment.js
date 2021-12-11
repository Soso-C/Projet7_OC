import React from "react";
import Axios from "axios";
import { useState } from "react";

// Material ui
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";

export default function MakeComment() {

  let test1 = JSON.parse(localStorage.getItem("token"));
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState(140)

  const sendCom = () => {
    Axios.post("http://localhost:3001/api/post/comment-post", {
      pId: postId,
      uId: test1.userId,
      comment: comment
    }, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      alert("Commentaire envoyée !")
    })
  };

  return (
    <div>
      <div className="comContainer">
        <div className="makeComContainer">
          <div className="comAvatarAndDate">
            <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo">
              S
            </Avatar>
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
