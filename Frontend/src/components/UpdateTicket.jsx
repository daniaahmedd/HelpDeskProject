import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../stylesheets/report.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Report = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ticket/gettickets"
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTickets();
  }, []);

  const openModal = (ticket) => {
    setSelectedItem({
      _id: ticket._id,
      status: ticket.status || "",
      issueSolution: ticket.issueSolution || "",
      emailuser: ticket.emailuser || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/ticket/${selectedItem._id}`,
        {
          status: selectedItem.status,
          issueSolution: selectedItem.issueSolution,
          emailuser: selectedItem.emailuser,
        }
      );
      setSelectedItem(response.data);
      closeModal(); // Close the modal after successful update if needed
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="col-md-4 mb-3">
              <div className="card custom-card">
                <div className="card-body">
                  <h5 className="card-title">Ticket</h5>
                  <p className="card-text">Status: {ticket.status}</p>
                  <p className="card-text">Categories: {ticket.categories}</p>
                  <Button variant="secondary" onClick={() => openModal(ticket)}>
                    Update Ticket
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showModal} onHide={closeModal} className="custom-modal">
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">Update Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {selectedItem && (
              <Form>
                <Form.Group controlId="formIssueSolution">
                  <Form.Label>Issue Solution</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter issue solution"
                    value={selectedItem.issueSolution}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        issueSolution: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formEmailUser">
                  <Form.Label>Email User</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={selectedItem.emailuser}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        emailuser: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Report;
