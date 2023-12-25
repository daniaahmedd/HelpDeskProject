import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6

 
const TicketDisplayPage = () => {
  const [tickets, setTickets] = useState([]);
  const [ratingData, setRatingData] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
 
  useEffect(() => {
    const fetchTickets = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/ticket/view");
          console.log("Fetched Tickets:", response.data);
          setTickets(response.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching tickets:", error);
          setError("Error fetching tickets. See console for details.");
        }
      };
      
 
    fetchTickets();
  }, []);
 
  const handleChange = (ticketId, e) => {
    const { value } = e.target;
    setRatingData((prevData) => ({
      ...prevData,
      [ticketId]: value,
    }));
  };
 
  const handleSubmit = async (ticketId) => {
    console.log("Submitting for ticket ID:", ticketId);
    setSubmitting(true);
 
    try {
      const response = await axios.put(
        `http://localhost:3000/api/ticket/rate/${ticketId}`,
        {
          rating: ratingData[`rating_${ticketId}`],
        }
      );
 
      console.log("Server Response:", response.data);
      setSuccess(`Ticket ${ticketId} rated successfully!`);
      setError(null);
    } catch (error) {
      console.error(`Error rating ticket ${ticketId}:`, error.message);
      setError(`Error rating ticket ${ticketId}`);
      setSuccess(null);
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div>
      <h1>Ticket Display Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Opened Time</th>
            <th>Close Time</th>
            <th>Categories</th>
            <th>Subcategories</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.status}</td>
              <td>{ticket.opendedtime}</td>
              <td>{ticket.closetime}</td>
              <td>{ticket.categories}</td>
              <td>{ticket.subcategories}</td>
              <td>
                <label>
                  Rating:
                  <input
                    type="number"
                    name={`rating_${ticket._id}`}
                    min="1"
                    max="5"
                    value={ratingData[`rating_${ticket._id}`] || ""}
                    onChange={(e) => handleChange(`rating_${ticket._id}`, e)}
                  />
                </label>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleSubmit(ticket._id)}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Rating"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};
 
export default TicketDisplayPage;