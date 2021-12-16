import React from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import "./Comment.css";
import { dateParser } from "../../../utils/Utils";
import Axios from "axios";

// Material ui
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Comment(props) {
  let test1 = JSON.parse(localStorage.getItem("token"));
  const com = props.com;


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
      // si l'user n'est pas authorisé et try de delete le com alors on clear son localStorage et on le redirige a l'accueil
      .catch((err) => {
        alert(err.response.data.error);
        localStorage.removeItem("token");
        window.location.href = "/sign-in";
      });
  };

  return (
    <div className="commentWrapper">
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
            <span>{dateParser(com.createdAt)}</span>
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
