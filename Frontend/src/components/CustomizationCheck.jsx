import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const CustomizationPage = () => {
  const [hasCustomization, setHasCustomization] = useState(null);

  useEffect(() => {
    const fetchCustomizationData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/customization/styleCustomize/find", {
          withCredentials:true
        });
        setHasCustomization(true);
        console.log("Fetched customization data:", response.data);
      } catch (error) {
        console.error("Error fetching customization data:", error.message);
        setHasCustomization(false);
      }
    };

    fetchCustomizationData();
  }, []);

  const handleNavigate = () => {
    console.log("Type of hasCustomization:", typeof hasCustomization);
    console.log("Value of hasCustomization:", hasCustomization);
  
    if (hasCustomization === true) {
      // Redirect to the update page
      console.log("Redirecting to UpdateCustomization");
      window.location.href = "/UpdateCustomization";
    } else {
      // Redirect to the create page
      console.log("Redirecting to CustomizationForm");
      window.location.href = "/CustomizationForm";
    }
  };
  

  return (
    <div>
      <Navbar/>
      <h1>Customization Page</h1>
      {hasCustomization === null ? (
        <p>Loading customization data...</p>
      ) : (
        <div>
          {hasCustomization ? (
            <p>Customization data exists. Choose an action:</p>
          ) : (
            <p>No customization data found. Choose an action:</p>
          )}
          <button type="button" onClick={handleNavigate}>
            {hasCustomization !== null && hasCustomization ? "Update Customization" : "Create Customization"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizationPage;
