import React from 'react'
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import "./Comment.css";
import { dateParser } from "../../../utils/Utils";

export default function Comment(props) {
    const com = props.com
    return (
        <div className="commentWrapper" >
          <div className="comPicNameDate">
            <div className="comAvatarName">
              <Avatar sx={{ bgcolor: red[500] }} aria-label="pseudo" id="comAvt">
              </Avatar>
            </div>
            <div className="unameAndBodyCom">
              <div className="comsNameDateCenter">
              <span id="ComUname">{com.author_name}</span>
              <span>{dateParser(com.createdAt)}</span>
              </div>
              <p className="bodyComs">{com.comments}</p>
            </div>          
          </div>
        </div>
    )
}
