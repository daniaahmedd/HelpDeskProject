import React, { useState } from "react";
import axios from "axios";
import "../stylesheets/customization.css"

const CustomizationForm = () => {
  const [customizationData, setCustomizationData] = useState({
    organizationName: "",
    logoURL: "",
    primaryColor: "",
    secondaryColor: "",
    accentColor: "",
    backgroundColor: "",
    titlesFontColor: "",
    fontColor: "",
    titlesFontSize: 0,
    fontSize: 0,
    titlesFontFamily: "",
    fontFamily: "",
    logoHeight: 0,
    logoWidth: 0,
    logoBorderColor: "",
    logoBackgroundColor: "",
    headerHeight: [0],
    headerWidth: [0],
    headerBackgroundColor: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomizationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkIfCustomizationExists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/customization/styleCustomize/find`,{
          withCredentials:true
        }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking customization existence:", error.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const exists = await checkIfCustomizationExists();

      if (exists) {
        // Customization exists, redirect to edit page or handle accordingly
        console.log("Customization already exists. Redirecting to edit page...");
        // Implement redirection logic or show a message to the user
      } else {
        // Customization doesn't exist, proceed with creating a new one
        const response = await axios.post(
          "http://localhost:3000/api/customization/styleCustomize",
          customizationData
        );
        console.log("Server Response:", response.data);
        setSuccess("Customization saved successfully!");
        setError(null);
      }
    } catch (error) {
      console.error("Error processing customization:", error.message);
      setError("Failed to save customization. Please try again.");
      setSuccess(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="customization-form">
      {Object.entries(customizationData).map(([key, value]) => (
        <label key={key}>
          {key}:
          <input
            type="text"
            name={key}
            value={Array.isArray(value) ? value.join(",") : value}
            onChange={handleChange}
          />
        </label>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Customization"}
      </button>
    </form>
  );
};

export default CustomizationForm;
