// Components/CustomizationForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "../stylesheets/customization.css";

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
        headerHeight: 0,
        headerWidth: 0,
        headerBackgroundColor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomizationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/styleCustomize", customizationData);
            console.log("Server Response:", response.data);
        } catch (error) {
            console.error("Error creating customization:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="customization-form">
            {/* Organization Name */}
            <label>
                Organization Name:
                <input
                    type="text"
                    name="organizationName"
                    value={customizationData.organizationName}
                    onChange={handleChange}
                />
            </label>

            {/* Logo URL */}
            <label>
                Logo URL:
                <input
                    type="text"
                    name="logoURL"
                    value={customizationData.logoURL}
                    onChange={handleChange}
                />
            </label>

            {/* Primary Color */}
            <label>
                Primary Color:
                <input
                    type="text"
                    name="primaryColor"
                    value={customizationData.primaryColor}
                    onChange={handleChange}
                />
            </label>

            {/* Secondary Color */}
            <label>
                Secondary Color:
                <input
                    type="text"
                    name="secondaryColor"
                    value={customizationData.secondaryColor}
                    onChange={handleChange}
                />
            </label>

            {/* Accent Color */}
            <label>
                Accent Color:
                <input
                    type="text"
                    name="accentColor"
                    value={customizationData.accentColor}
                    onChange={handleChange}
                />
            </label>

            {/* Background Color */}
            <label>
                Background Color:
                <input
                    type="text"
                    name="backgroundColor"
                    value={customizationData.backgroundColor}
                    onChange={handleChange}
                />
            </label>

            {/* Titles Font Color */}
            <label>
                Titles Font Color:
                <input
                    type="text"
                    name="titlesFontColor"
                    value={customizationData.titlesFontColor}
                    onChange={handleChange}
                />
            </label>

            {/* Font Color */}
            <label>
                Font Color:
                <input
                    type="text"
                    name="fontColor"
                    value={customizationData.fontColor}
                    onChange={handleChange}
                />
            </label>

            {/* Titles Font Size */}
            <label>
                Titles Font Size:
                <input
                    type="number"
                    name="titlesFontSize"
                    value={customizationData.titlesFontSize}
                    onChange={handleChange}
                />
            </label>

            {/* Font Size */}
            <label>
                Font Size:
                <input
                    type="number"
                    name="fontSize"
                    value={customizationData.fontSize}
                    onChange={handleChange}
                />
            </label>

            {/* Titles Font Family */}
            <label>
                Titles Font Family:
                <input
                    type="text"
                    name="titlesFontFamily"
                    value={customizationData.titlesFontFamily}
                    onChange={handleChange}
                />
            </label>

            {/* Font Family */}
            <label>
                Font Family:
                <input
                    type="text"
                    name="fontFamily"
                    value={customizationData.fontFamily}
                    onChange={handleChange}
                />
            </label>

            {/* Logo Height */}
            <label>
                Logo Height:
                <input
                    type="number"
                    name="logoHeight"
                    value={customizationData.logoHeight}
                    onChange={handleChange}
                />
            </label>

            {/* Logo Width */}
            <label>
                Logo Width:
                <input
                    type="number"
                    name="logoWidth"
                    value={customizationData.logoWidth}
                    onChange={handleChange}
                />
            </label>

            {/* Logo Border Color */}
            <label>
                Logo Border Color:
                <input
                    type="text"
                    name="logoBorderColor"
                    value={customizationData.logoBorderColor}
                    onChange={handleChange}
                />
            </label>

            {/* Logo Background Color */}
            <label>
                Logo Background Color:
                <input
                    type="text"
                    name="logoBackgroundColor"
                    value={customizationData.logoBackgroundColor}
                    onChange={handleChange}
                />
            </label>

            {/* Header Height */}
            <label>
                Header Height:
                <input
                    type="number"
                    name="headerHeight"
                    value={customizationData.headerHeight}
                    onChange={handleChange}
                />
            </label>

            {/* Header Width */}
            <label>
                Header Width:
                <input
                    type="number"
                    name="headerWidth"
                    value={customizationData.headerWidth}
                    onChange={handleChange}
                />
            </label>

            {/* Header Background Color */}
            <label>
                Header Background Color:
                <input
                    type="text"
                    name="headerBackgroundColor"
                    value={customizationData.headerBackgroundColor}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Save Customization</button>
        </form>
    );
};

export default CustomizationForm;
