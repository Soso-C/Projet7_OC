import React from "react";
import "../styles/Home.css";
import PostCard from "../components/Post/PostCard/PostCard";
import SearchBar from "../components/SearchBar/SearchBar";
import MakePost from "../components/Post/MakePost/MakePost";
import Post from "../components/Post/Post";


const Home = () => {
  

  return (
    <div className="Home">
      <SearchBar />
      <MakePost />
      <Post />
    </div>
  );
};

export default Home;
