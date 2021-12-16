import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import "./MakeComment.css";

// Material ui
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

export default function MakeComment(props) {
  let test1 = JSON.parse(localStorage.getItem("token"));
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState(props.postId);

  /******************************************************************** Get Commentaires  *********************************************************************/
  // Récupérer les commentaires du postID

  const [comData, setComData] = useState([]);

  // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/post/comment-post/${postId}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }) // on montre notre token qui est save dans le localstorage pour voir nos coms
      .then((res) => {
        setComData(res.data);
      });
  }, [test1.token]);

/****************************************************************************************************************************************************************/
  // Envoyer un commentaire avec son postID
  const sendCom = () => {
    Axios.post(
      "http://localhost:3001/api/post/comment-post",
      {
        pId: postId,
        comment: comment,
      },
      {
        headers: { Authorization: `Bearer ${test1.token}` },
      }
    )
      .then((res) => {
        alert("Commentaire envoyée !");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div>
      <div className="comContainer">
        <div className="makeComContainer">
          <div className="comAvatarAndDate"></div>
          <input
            type="text"
            placeholder="Ecrivez un commentaire ..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <IconButton onClick={sendCom} id='sendComs'>
            <SendIcon />
          </IconButton>
        </div>
        <div className="comsList">
          {comData.map((com) => (
            <Comment com={com} key={com.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
