import React from 'react';
import PostCard from '../components/Post/PostCard/PostCard';
import SearchBar from '../components/ProfileComponents/SearchBar';


const Home = () => {
    const divStyle = {
        textAlign: 'center',
      };

    return (
        <div>
            <SearchBar />
            <h1 style={divStyle}>Bienvenue sur Home</h1>
            <PostCard />
        </div>
    );
};

export default Home;