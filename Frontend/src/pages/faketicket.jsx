import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Faketicket() {
const navigate = useNavigate();
  
  async  function openChat(){
         await axios.post(
            `http://localhost:3000/api/chat/openchat`, {ticketid:"658877b51c2d3afa0a37669f"}, {withCredentials: true})
            .then(data => {
                navigate("/chat");
            })
            .catch(error => {
                alert(error.message);
            });
    }

  return (
    <button onClick={openChat} >Open Chat</button> 
  )
}
