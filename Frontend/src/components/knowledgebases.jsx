import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import "../stylesheets/knowledgebase.css"

const KnowledgeBaseSearch = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {

      const response = await axios.post("http://localhost:3000/api/knowledgeBaseRoutes", {
      
          question_category: category,
          question_subcategory: subcategory
      }
      );
      console.log('catg',category,'sub:',subcategory);
      console.log('data',response.data);
      
      setSearchResults(response.data);
      console.log('Search Results:', searchResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <div className="row g-3 container mx-auto">
      <Navbar/>
      <div className="col-6">
        <label className="fw-bold mb-0 fs-4 text-body-emphasis">Category:</label>
        <input
        className="form-control form-control-dark text-bg-dark"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="col-6">
        <label className="fw-bold mb-0 fs-4 text-body-emphasis">Subcategory:</label>
        <input
        className="form-control form-control-dark text-bg-dark"
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
      </div>
      <div className="col-12 d-flex justify-content-center w-5">
        <button className="px-5 mx-auto" onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {Array.isArray(searchResults) &&
          searchResults.map((result, index) => (
            <div key={result.question_id} className={`result-card card${index % 2 === 0 ? ' gradient-1' : ' gradient-2'}`}>
              
              <div className="card">
                <div className="card-body">
                  <p className="card-title fw-bold mb-0 fs-4 text-body-emphasis">{result.question}</p>
                  <p className="card-text" style={{ color: '#ffffff' }}>{result.solution}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

};

export default KnowledgeBaseSearch;
