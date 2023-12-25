import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6


export default function UpdateTicket() {
    const [ticketid, setTicketid] = useState("");
    const [status, setStatus] = useState("");
    const [issueSol, setIssueSol ] = useState("");
    const [result, setResult] = useState("");
    const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6

    const handleUpdate = async() => {
        console.log(ticketid, status, issueSol);
        const respose = await axios.put("http://localhost:3000/api/ticket/:ticketid", {
           ticketid: ticketid,
           status: status,
           issueSolution: issueSol,
        })
        setResult(respose.data);
       };
       const redirectToHome = () => {
        navigate("/TicketHome"); // Navigate to the "/UpdateTicket" route
       };
       return (
        <>
          <div>
            <Navbar />
            <h4>Update Ticket</h4>
            <p>Ticket Id</p>
        <input type="text" className="form-control" placeholder="Enter Ticket Id" value={ticketid}
          onChange={(e) => setTicketid(e.target.value)}></input>
        <p>Subcategories</p>
        <input type="text" className="form-control" placeholder="Enter Status" value={status}
          onChange={(e) => setStatus(e.target.value)}></input>
        <p>Issue Solution</p>
        <input type="text" className="form-control" placeholder="Enter Issue Solution" value={issueSol}
          onChange={(e) => setIssueSol(e.target.value)}></input>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Ticket</button>
            <button type="button" className="btn btn-primary" onClick={redirectToHome}>Back</button>
          </div>
        </>
    );

}