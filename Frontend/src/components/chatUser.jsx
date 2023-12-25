/* eslint-disable react/prop-types */
import React from 'react'
import "../stylesheets/chatUser.css";
import user from "../assets/user.png";


export default function ChatUser(props) {
  return (
        <div className="user--chat--div" onClick={props.setName} >
            <h3 className="h3--username"> <img src={user} className="user--img"/> {props.UserName}</h3>
        </div>
  )
}
