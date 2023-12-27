import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../stylesheets/report.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Report = () => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [success, setSuccess] = useState(null);
  const [rating, setRating] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  


  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ticket/gettickets",{withCredentials:true}

        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTickets();
  }, []);

  const openRatingModal = (ticket) => {
    setSelectedTicketId(ticket._id); // Corrected line
    setShowRatingModal(true);
  };
  
  const closeRatingModal = () => {
    setShowRatingModal(false);
    setSelectedTicketId(null);
    setRating(0);
  };

  const handleSubmit = async (ticketId) => {
    console.log("Submitting for ticket ID:", ticketId);
    setSubmitting(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/ticket/rate/${ticketId}`,
        {
          rating: rating,
        }
        ,{withCredentials:true}
      );
      closeRatingModal();

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
      <div className="container mt-4">
      <Navbar />
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="col-md-4 mb-3">
              <div className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title">Ticket</h5>
                  <p className="card-text">Status: {ticket.status}</p>
                  <p className="card-text">Categories: {ticket.categories}</p>
                  <Button variant="secondary" onClick={() => openRatingModal(ticket)}>
Rate                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={showRatingModal}
          onHide={closeRatingModal}
          className="custom-modal"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">Rate Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {/* Form fields for rating the ticket */}
            <Form>
              <Form.Group controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter rating"
                  value={isNaN(rating) ? "" : rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={closeRatingModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmit(selectedTicketId)}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default Report;
