import React from 'react';
import "../styles/Home.css"
import PostCard from '../components/Post/PostCard/PostCard';
import SearchBar from "../components/SearchBar/SearchBar";


const Home = () => {
    const divStyle = {
        textAlign: 'center',
      };

    return (
        <div className="Home">
            <SearchBar />
            <h1 style={divStyle}>Bienvenue sur Home</h1>
            <PostCard />
        </div>
    );
};

export default Home;