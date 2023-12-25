import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6
// import { useAuth } from '../authContext';

// export default function Ticket() {

//   const { user } = useAuth();

export default function Ticket() {
 const [categories, setCategory] = useState("");
 const [subcategories, setSubcategory] = useState("");
 const [issueDesc, setIssueDesc ] = useState("");
 const [result, setResult] = useState("");
 const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6

 const handleCreate = async(event) => {
 console.log(categories, subcategories, issueDesc);
 event.preventDefault();
 try{
    const response = await axios.post("http://localhost:3000/api/ticket/create", {
    categories: categories,
    subcategories: subcategories,
    issueDescription: issueDesc,
    //userId: user ? user.id : null,
 })
 setResult(response.data);
 console.log(response.data);
 }catch(error) {
  console.log(error);
}
};
  const redirectToHome = () => {
    navigate("/TicketHome"); // Navigate to the "/UpdateTicket" route
   };
    return (
        <>
          <div>
            <Navbar />
            <h4>Create Ticket</h4>
            <p>Categories</p>
        <input type="text" className="form-control" placeholder="Enter Category" value={categories}
          onChange={(e) => setCategory(e.target.value)}></input>
        <p>Subcategories</p>
        <input type="text" className="form-control" placeholder="Enter Subcategory" value={subcategories}
          onChange={(e) => setSubcategory(e.target.value)}></input>
        <p>Issue Description</p>
        <input type="text" className="form-control" placeholder="Enter Issue Description" value={issueDesc}
          onChange={(e) => setIssueDesc(e.target.value)}></input>
            <button type="button" className="btn btn-primary" onClick={handleCreate}>Create Ticket</button>
            <button type="button" className="btn btn-primary" onClick={redirectToHome}>Back</button>
          </div>
        </>
    );

}