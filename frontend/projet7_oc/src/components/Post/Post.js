import React from 'react';
import PostCard from './PostCard/PostCard'
import { useState, useEffect } from 'react';
import Axios from 'axios';

const Post = () => {

    const [data, setData] = useState([])

    // useEffect permet de récupérer la data et de l'afficher une seul fois avec les [].
    useEffect(() => {
        Axios.get("http://localhost:3001/api/post/")
        .then((res) => { setData(res.data)})
        console.log(setData)
    }, [])

    return (
        <div className='postContainer'>
            <div className="postLists">
                {data.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
};

export default Post;