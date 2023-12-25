import React, { useState, useEffect } from 'react';
import '../stylesheets/knowldgebases.css';

const KnowledgeBase = () => {
  const [knowledgeData, setKnowledgeData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [filteredFaqData, setFilteredFaqData] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/knowledgebase');
        if (response.ok) {
          const data = await response.json();
          setKnowledgeData(data);
          setFilteredFaqData(data); // Initialize filtered data with all fetched data
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on category and subcategory
    const filteredData = knowledgeData.filter((faqItem) => {
      return (
        faqItem.question_category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
        faqItem.question_subcategory.toLowerCase().includes(subcategoryFilter.toLowerCase())
      );
    });
    setFilteredFaqData(filteredData);
  }, [categoryFilter, subcategoryFilter, knowledgeData]);

  const handleSearch = () => {
    // Perform search based on filters when the Search button is clicked
    // This function can be modified to perform specific actions when the button is clicked
    // In this example, filtering logic is already handled in useEffects based on input changes
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <body>
      <div>
        <h1 className="faq-heading">FAQ'S</h1>
        <div className="faq-one">
          <h1 className="faq-page"></h1>

          <div className="faq-search">
            <input
              type="text"
              placeholder="Search Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search Subcategory"
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <div className="faq-body">
            {filteredFaqData.map((faqItem, index) => (
              <div key={faqItem._id}>
                <h2>Category: {faqItem.question_category}</h2>
                <h3 className="faq-question" onClick={() => toggleFaq(index)}>
                  Question: {faqItem.question}
                </h3>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>Solution: {faqItem.solution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="hr-line" />
      </div>
    </body>
  );
};

export default KnowledgeBase;
