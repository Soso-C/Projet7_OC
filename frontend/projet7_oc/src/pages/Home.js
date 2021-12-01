import React from "react";
import "../styles/Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import Post from "../components/Post/Post";


const Home = () => {
  

  return (
    <div className="Home">
      <SearchBar />
      <Post />
    </div>
  );
};

export default Home;
