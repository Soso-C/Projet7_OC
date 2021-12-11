import React from "react";
import "./PostCard.css";
import Axios from "axios";
import { dateParser } from "../../Utils";
import MakeComment from "../../Comments/MakeComment/MakeComment";

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
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";


export default function PostCard(props) {
  const post = props.post;

  let test1 = JSON.parse(localStorage.getItem("token"));
  const test = "http://localhost:3001/";

  // Permet de supprimer un post depuis l'id de notre Post
  const deletePost = () => {
    Axios.delete(`http://localhost:3001/api/post/${post.id}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }).then((res) => {
      alert("Publication supprimée avec succes !");
      window.location.reload();
    });
  };

  return (
    <div className="postCardWrap">
      <Card sx={{ width: 600 }} id="card1">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo">
              S
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="User Name"
          subheader={dateParser(post.post_date)}
        />
        <CardContent>
          <Typography
            variant="body1"
            color="text.primary"
            className="title_post"
          >
            {post.title}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="350"
          image={test + post.img_url}
          alt={post.title}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <CommentOutlinedIcon />
          </IconButton>
          <p className="pPostCard">8 commentaires</p>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon className="favIcon" />
          </IconButton>
          <p className="pPostCard">10 likes</p>
          {/* Affiche le btn a l'user si il est l'owner ou bien admin si non le cache*/}
          {test1.userId === post.user_id ? (
            <IconButton onClick={deletePost} id="deletePost">
              <DeleteIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
        </CardActions>
        <MakeComment />
      </Card>
    </div>
  );
}
