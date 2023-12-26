import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../stylesheets/report.css";
import Navbar from "../components/navbar";

const Report = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/report/create"
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTickets();
  }, []);

  const createReport = async (_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/report/create/${_id}`,
        {
          params: { _id: _id },
        }
      );

      setSelectedItem(response.data);
      setShowModal(true); // Show the modal after report creation
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };
  const containerStyle = {
    backgroundColor: "#e6e6e6", // Updated background color
    padding: "20px" // Adjust padding as needed
    // Add other styles as required
  };

  return (
    <div className="container mt-4" style={containerStyle}>
  <Navbar />
      <div className="header">
        <h1>Create A Report</h1>
      </div>
      <div className="row">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="col-md-4 mb-3">
            <div className="card custom-card">
              <div className="card-body">
                <h5 className="card-title">Ticket</h5>
                <p className="card-text">Status: {ticket.status}</p>
                <p className="card-text">Categories: {ticket.categories}</p>
                <button
                  onClick={() => createReport(ticket._id)}
                  className="btn btn-secondary"
                >
                  Create Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} className="custom-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {selectedItem && (
            <>
                <p>Status: {selectedItem.status}</p>
                <p>Opened Time: {selectedItem.openedtime}</p>
                <p>Ticket ID: {selectedItem.ticketid}</p>
              {selectedItem.status == "Closed" && (
                <>
                  <p>Closed Time: {selectedItem.closedtime}</p>
                  <p>Agent ID: {selectedItem.agentid}</p>
                  <p>Resolution Time: {selectedItem.resolutiontime}</p>
                  <p>Agent Rating: {selectedItem.Agentrating}</p>
                  
                </>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* You can add additional buttons or actions here */}
        </Modal.Footer>
      </Modal>
    </div>

);
};

export default Report;
