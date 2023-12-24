import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="col-12">
        <ul>
          {Array.isArray(searchResults) &&
            searchResults.map((result) => (
              <div key={result.question_id}>
                <p className="fw-bold mb-0 fs-4 text-body-emphasis">{result.question}</p>
                <p>{result.solution}</p>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBaseSearch;
