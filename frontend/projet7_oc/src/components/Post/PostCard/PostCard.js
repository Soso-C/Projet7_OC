import React from "react";
import "./PostCard.css";

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

export default function PostCard(props) {

  const post = props.post
  return (
    <div className="postCardWrap">
      <Card sx={{ width: 600 }} className="card1">
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
          subheader={post.post_date}
        />
        <CardMedia
          component="img"
          height="300"
          image={post.img_url}
          alt="Photo punta cana"
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {post.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <CommentOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
          <FavoriteIcon className="favIcon"/>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
