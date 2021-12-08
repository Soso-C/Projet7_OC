import React from "react";
import PostCard from "./PostCard/PostCard";
import { useState, useEffect } from "react";
import Axios from "axios";
import MakePost from "./MakePost/MakePost";

let test1 = JSON.parse(localStorage.getItem("token"));
const Post = () => {
  
  const [data, setData] = useState([]);

  // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
  useEffect(() => {
    Axios.get("http://localhost:3001/api/post/", { headers: { Authorization: `Bearer ${test1.token}` } }) // on montre notre token qui est save dans le localstorage pour voir nos post
    .then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="postContainer">
      <MakePost />
      <div className="postLists">
        {data.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Post;
