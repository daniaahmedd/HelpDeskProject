import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../stylesheets/restore.css";

const RestoreBackup = () => {
  const [restoreStatus, setRestoreStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract state data from the location object
  const { id, userName, userType, token } = location.state || {};

  const restoreBackup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/backup/restore",
        {},
        {
          withCredentials: true,
          // You may need to include the token in the request headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Server Response:", response);
      setRestoreStatus(response.data.message);
    } catch (error) {
      console.log("Error in restoring backup", error);
      console.log("Error Message:", error.message);
      console.log("Error Response:", error.response);
      setRestoreStatus("Restore failed");
    }
  };

  return (
    <div className="restore">
      <div style={{ margin: "30px" }}>
        <Button onClick={restoreBackup}>Start Restoring</Button>
        <p>Status: {restoreStatus}</p>
        <Button onClick={() => navigate("/")}>Home Page</Button>
      </div>
    </div>
  );
};

export default RestoreBackup;
