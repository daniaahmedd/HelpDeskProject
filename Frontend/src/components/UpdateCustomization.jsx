import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/customization.css";

const UpdateCustomizationForm = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/customization/styleCustomize/find", {
          withCredentials:true
        });
        const { __v, _id, ...dataWithoutId } = response.data;
        

        setCustomizationData(dataWithoutId ,dataWithoutv );
        

        console.log("Fetched Data:", response.data);
        //setCustomizationData(response.data); // Assuming the API returns the entire data
        setError(null);
      } catch (error) {
        console.error("Error fetching customization data:", error.message);
        setError("Looks like you need to create a customization first ;)");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomizationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.put(
        "http://localhost:3000/api/customization/styleCustomize/edit",
        customizationData , { withCredentials:true}
      );

      console.log("Server Response:", response.data);
      setSuccess("Customization updated successfully!");
      setError(null);
    } catch (error) {
      console.error("Error updating customization:", error.message);
      setError("Looks like you don't have a customization");
      setSuccess(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="customization-form">
        {/* Render input fields based on customizationData */}
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
          {submitting ? "Updating..." : "Update Customization"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomizationForm;