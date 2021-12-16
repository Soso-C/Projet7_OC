import React from 'react'
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import "./Comment.css";

export default function Comment() {
    return (
        <div className="commentWrapper" >
          <div className="comPicNameDate">
            <div className="comAvatarName">
              <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo" id="comAvt">
              </Avatar>
            </div>
            <div className="unameAndBodyCom">
              <div className="comsNameDateCenter">
              <span id="ComUname">Andrea Galbani</span>
              <span>14 Dec 2021 15:24</span>
              </div>
              <p className="bodyComs">Lorem ipsum dolor sit, amet consectetur adipisicing elitdipisicing elitdipisicing elitdipisicing elit</p>
            </div>          
          </div>
        </div>
    )
}
