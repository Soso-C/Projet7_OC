import React from "react";
import "../styles/Home.css";
import Post from "../components/Post/Post";
import NewSearchBar from "../components/SearchBar/NewSearchBar"


const Home = () => {
  

  return (
    <div className="Home">
      <NewSearchBar />
      <Post />
    </div>
  );
};

export default Home;
