import React, { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/ViewAllReports.css";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const ViewAllReports = () => {
  const [reports, setReports] = useState([]);
  // Assuming report.closedtime is a timestamp

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/report/view"
        );
        setReports(response.data); // Assuming response.data is an array of report objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="report-container">
      <Navbar />

      <Link to="/report " className="back-button">
        Go Back
      </Link>
      <h1>All Reports</h1>
      <table className="report-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Status</th>
            <th>Opened Time</th>
            <th>Closed Time</th>
            <th>Resolution Time</th>
            <th>Rating</th>
            <th>Agent Rating</th>
            <th>Agent ID</th>
            <th>Ticket ID</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report._id}</td>
              <td>{report.status}</td>
              <td>{new Date(report.openedtime).toLocaleString()}</td>
              <td>
                {report.closedtime
                  ? new Date(report.closedtime).toLocaleString()
                  : ""}
              </td>
              <td>{report.resolutiontime}</td>
              <td>{report.rating}</td>
              <td>{report.Agentrating}</td>
              <td>{report.agentid}</td>
              <td>{report.ticketid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllReports;
