import React from "react";
import MakeComment from "./MakeComment/MakeComment";
import Comment from "./Comment/Comment";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Comments(props) {
  const post = props.post;
  const test1 = JSON.parse(localStorage.getItem("token"));

  const [comData, setComData] = useState([]);


  // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/post/comment-post/${post.post_id}`, {
      headers: { Authorization: `Bearer ${test1.token}` },
    }) // on montre notre token qui est save dans le localstorage pour voir nos post
      .then((res) => {
        setComData(res.data);
        console.log(post.post_id)
        console.log(res.data)
      });
  }, [test1.token]);

  return (
    <div className="scrollComsContainer">
      <MakeComment postId={post.id} />
      <div className="comsList">
        {comData.map((com) => (
          <Comment com={com} key={com.id} />
        ))}
      </div>
    </div>
  );
}
