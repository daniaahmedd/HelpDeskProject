import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../stylesheets/createticket.css";
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
 const {state} = useLocation();
 const [showModal, setShowModal] = useState(false); // State to control modal visibility


 if(state){
  console.log(state)
  var { id, userName, userType, token } = state;
}

 const handleCreate = async(event) => {
 console.log(categories, subcategories, issueDesc);
 event.preventDefault();
 try{
    const response = await axios.post(`http://localhost:3000/api/ticket/create`, {
    categories: categories,
    subcategories: subcategories,
    issueDescription: issueDesc,
    userid: id
    //userId: user ? user.id : null,
    }, {
      withCredentials: true
    })
    setResult(response.data);
    setShowModal(true); 
 console.log(response.data);
 }catch(error) {
  console.log(error);
}
};
const closeModal = () => {
  setShowModal(false); // Function to close the modal
};
  const redirectToHome = () => {
    navigate("/TicketHome"); // Navigate to the "/UpdateTicket" route
   };
    return (
      <>
      <Navbar />
      <div className="ticket-form-container">
        <div>
          <h4>Create Ticket</h4>
          <p>Categories</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Category"
            value={categories}
            onChange={(e) => setCategory(e.target.value)}
          />
          <p>Subcategories</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Subcategory"
            value={subcategories}
            onChange={(e) => setSubcategory(e.target.value)}
          />
          <p>Issue Description</p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Issue Description"
            value={issueDesc}
            onChange={(e) => setIssueDesc(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={handleCreate}>
            Create Ticket
          </button>
          <button type="button" className="btn btn-primary" onClick={redirectToHome}>
            Back
          </button>
          {result && (
            <div className="ticket-data-box">
              <h4>Ticket Created</h4>
              <p>Category: {result.categories}</p>
              <p>Subcategory: {result.subcategories}</p>
              <p>Issue Description: {result.issueDescription}</p>
              {/* Add other relevant data from the 'result' state */}
            </div>
          )}
        </div>
      </div>
    </>
    );

}