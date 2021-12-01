import React from "react";
import { useState } from "react";
import "./MakePost.css";
import Axios from "axios";

export default function MakePost() {
  const [title, setTitle] = useState("");
  const [imgInput, setImgInput] = useState("");

  const sendPost = () => {

    Axios.post("http://localhost:3001/api/post/", {
      title: title,
      img: imgInput,
    })
  };

  return (
    <div>
      <div className="container">
        <div className="wraper-left">
          <div className="avatar">S</div>
        </div>
        <div className="wraper-right">
          <textarea
            placeholder="Dites nous quelque chose de cool"
            rows="20"
            cols="40"
            autocomplete="off"
            aria-autocomplete="list"
            aria-haspopup="true"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);}}
          />
          <input
          placeholder="Image url"
          type='text'
          value={imgInput}
          onChange={(e) => {
            setImgInput(e.target.value);}}
          />
          <div>
            <button className="btnTweet" onClick={sendPost}>Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
}