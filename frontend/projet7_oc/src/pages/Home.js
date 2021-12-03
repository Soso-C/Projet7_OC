import React from "react";
import "../styles/Home.css";
import SearchBar from "../components/SearchBar/SearchBar";
import Post from "../components/Post/Post";
import NewSearchBar from "../components/SearchBar/NewSearchBar"


const Home = () => {
  

  return (
    <div className="Home">
      <NewSearchBar />
      {/* <SearchBar /> */}
      <Post />
    </div>
  );
};

export default Home;
