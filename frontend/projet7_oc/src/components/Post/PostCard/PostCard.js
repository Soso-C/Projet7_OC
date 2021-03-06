import React from "react";
import "./PostCard.css";
import Axios from "axios";
import { dateParser } from "../../../utils/Utils";
import { useState, useEffect } from "react";

// Material ui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import MakeComment from "../../Comments/MakeComment/MakeComment";

export default function PostCard(props) {
  const post = props.post;

  let test1 = JSON.parse(localStorage.getItem("token"));

  /******************************************************************************** Count Comment Post *********************************************************************************/

  const [countData, setCountData] = useState(0);

  // Appel API qui permet de stock nos commentaires dans un state.
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const fetchData = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/post/comment-count/${post.id}`,
          {
            headers: { Authorization: `Bearer ${test1.token}` },
          }
        ); // on récupere la value du 'COUNT' de notre réponse SQL.
        setCountData(fetchData.data[0]["COUNT(*)"]);
      } catch (err) {}
    };
    fetchCount();
  }, [test1.token, post.id]);

  /************************************************************************************************************************************************************************************/

  // Toggle commentaire show/hide

  const [openCom, setOpenCom] = useState(false);

  const toggleComs = () => {
    setOpenCom(!openCom);
  };

  // Permet de supprimer un post depuis l'id de notre Post
  const deletePost = () => {
    Axios.delete(`${process.env.REACT_APP_API_URL}/api/post/${post.id}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    })
      .then((res) => {
        alert("Publication supprimée avec succes !");
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  return (
    <div className="postCardWrap">
      <Card sx={{ width: 600 }} id="card1">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo"></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.author_name}
          subheader={dateParser(post.post_date)}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="text.primary"
            className="title_post"
          >
            <span id="postTitle">{post.title}</span>
          </Typography>
        </CardContent>
        <CardMedia
          id="imgPostCard"
          component="img"
          height="350"
          image={`${process.env.REACT_APP_API_URL}/${post.img_url}`}
          alt=""
        />
        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={toggleComs}>
            <CommentOutlinedIcon />
          </IconButton>
          {/* Si les commentaires du post sont supérieur ou = a 2 alors on ajoute un S si non non */}
          <p className="pPostCard">
            {countData >= 2
              ? `${countData} commentaires`
              : `${countData} commentaire`}
          </p>
          {/* Affiche le btn a l'user si il est l'owner ou bien admin si non le cache*/}
          {test1.userId === post.user_id || test1.admin === 1 ? (
            <IconButton onClick={deletePost} id="deletePost">
              <DeleteIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </CardActions>
        {/* si on clic sur le bouton commentaire alors il passe true et affiche makecomment si non rien */}
        {openCom === true ? <MakeComment postId={post.id} /> : <></>}
      </Card>
    </div>
  );
}
