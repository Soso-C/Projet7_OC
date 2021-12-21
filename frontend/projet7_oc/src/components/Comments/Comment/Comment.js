import React from "react";
import "./Comment.css";
import { dateParserCom } from "../../../utils/Utils";
import Axios from "axios";

// Material ui
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

export default function Comment(props) {
  let test1 = JSON.parse(localStorage.getItem("token"));
  const com = props.com;

  // Appel API pour delete le commentaire.
  const deleteComs = () => {
    Axios.delete(`http://localhost:3001/api/post/comment-post/${com.id}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    })
      // si userid est owner du coms et que la request est effectué on alert le sucess et on refresh la page
      .then((res) => {
        console.log(res);
        alert("Commentaire supprimée avec succes !");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div
      className={
        // si user = com uId alors on met le BG en blue pour montrer ses messages.
        test1.userId === com.user_id
          ? "commentWrapper ownerCom"
          : "commentWrapper"
      }
    >
      <div className="comPicNameDate">
        <div className="comAvatarName">
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="pseudo"
            id="comAvt"
          ></Avatar>
        </div>
        <div className="unameAndBodyCom">
          <div className="comsNameDateCenter">
            <span id="ComUname">{com.author_name}</span>
            <span>{dateParserCom(com.createdAt)}</span>
            {/* Si l'user est l'owner du commentaire ou si l'user est admin alors on affiche le btn delete commentaire si non rien*/}
            {test1.userId === com.user_id || test1.admin === 1 ? (
              <IconButton onClick={deleteComs} id="deleteComsIcon" size="small">
                <DeleteIcon />
              </IconButton>
            ) : (
              <></>
            )}
          </div>
          <p className="bodyComs">{com.comments}</p>
        </div>
      </div>
    </div>
  );
}
