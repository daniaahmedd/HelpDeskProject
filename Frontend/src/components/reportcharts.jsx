import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import "../stylesheets/chart.css";

import Navbar from "../components/navbar";

const TicketCharts = () => {
  const [data, setData] = useState({});
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/report/tickets',{
          withCredentials:true
        });
        const responseData = response.data;

        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTicketData();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0 && showCharts) {
      const categories = Object.keys(data.categories);
      const categoryCounts = Object.values(data.categories);
      const status = Object.keys(data.status);
      const statusCounts = Object.values(data.status);

      const categoryCtx = document.getElementById('categoryChart').getContext('2d');
      createBarChart(categoryCtx, categories, categoryCounts, 'Categories');

      const statusCtx = document.getElementById('statusChart').getContext('2d');
      createBarChart(statusCtx, status, statusCounts, 'SubCategories');
    }
  }, [data, showCharts]);

  const createBarChart = (ctx, labels, counts, label) => {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: counts,
            backgroundColor: [
              '#787878'
            ],
            borderWidth: 1,
            barThickness: 50
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white', // Change X-axis label color to white
            },
          },
          y: {
            ticks: {
              color: 'white', // Change Y-axis label color to white
            },
          },
        },
      }
    });
  };

  const handleButtonClick = () => {
    setShowCharts(!showCharts);
  };

  return (
    <>
    <Navbar/>
    <div className="chart-container">
         

      <button onClick={handleButtonClick}>
        {showCharts ? 'Hide Charts' : 'Show Charts'}
      </button>
      {showCharts && (
        <div>
          <div className="chart">
            <h2 className="chart-title">Categories</h2>
            <canvas id="categoryChart" width="400" height="300"></canvas>
          </div>
          <div className="chart">
            <h2 className="chart-title">subCategories</h2>
            <canvas id="statusChart" width="400" height="300"></canvas>          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default TicketCharts;
