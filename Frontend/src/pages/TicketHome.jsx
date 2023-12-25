import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6

export default function TicketHome() {
    const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6

    const redirectToCreate = () => {
        navigate("/Ticket"); // Navigate to the "/Ticket" route
       };
    const redirectToUpdate = () => {
        navigate("/UpdateTicket"); // Navigate to the "/UpdateTicket" route
       };
    const redirectToRate = () => {
        navigate("/RateTicket"); // Navigate to the "/RateTicket" route
       };
 return (
    <>
      <div>
        <Navbar />
        <h4>Ticket</h4>
    
        <button type="button" className="btn btn-primary" onClick={redirectToCreate}>Create Ticket</button>
        <button type="button" className="btn btn-primary" onClick={redirectToUpdate}>Update Ticket</button>
        <button type="button" className="btn btn-primary" onClick={redirectToRate}>Rate Ticket</button>
      </div>
    </>
);
}