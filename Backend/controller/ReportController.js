
const ticketschema = require('../Models/ticketModel');
const D3Node = require('d3-node');
const d3 = require('d3');
const fs = require('fs');
const sharp = require('sharp');
const reportModel = require('../Models/reportModel');

const ReportController = {

    gettickets:async (req, res) =>{
        try {
            const data = await ticketschema.find().lean().exec();
            return res.status(200).json(data);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    },
  createReport : async (req, res) => {

    try {
      
        // Get the current time
        const ticket = await ticketschema.findById(req.params.ticketId);

        var reportData;
        console.log("ticket =>", ticket)
       

        // Check if the status is "Closed"
        if (ticket.status !== "Closed") {
            console.log("helllllllllllllllo")
            // If not closed, create a new report without closing time
            reportData = {
                status : ticket.status,
                openedtime: ticket.opendedtime,
                closedtime: null  ,
                rating: ticket.rating,
                agentId: null,
                resolutiontime : null,
                ticketid: req.params.ticketId,
                Agentrating : null
            };
        } else {
            // If closed, create a new report with closing time
            console.log("hiiiiiiiiiii")
            
            reportData = {
                status : ticket.status,
                openedtime: ticket.opendedtime,
                closedtime: ticket.closetime ,
                rating: ticket.rating,
                agentId: ticket.agentid,
                resolutiontime : ticket.closetime - ticket.opendedtime ,
                ticketid: req.params.ticketId,
                Agentrating : ticket.Agentrating
            };
        }

        // Create a new report based on the provided data
        const newReport = await reportModel.create(reportData);

        return res.status(201).json(newReport);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
    }


        // Export the function for use in your routes
        module.exports = {
            createReport,
        };

        },


    getReport:async (req, res) =>{
        try {
            const report = await reportModel.find();
            return res.status(200).json(report);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    },

    // Assuming you have a route like this to get ticket data

    getTicket: async (req, res) => {
        try {
          const categoryCounts = await ticketschema.aggregate([
            { $group: { _id: '$mongodb://localhost:27017', count: { $sum: 1 } } },
          ]);
      
          const statusCounts = await ticketschema.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ]);
      
          const formattedCountsCat = {};
          const formattedCountsStatus = {};
      
          categoryCounts.forEach((category) => {
            formattedCountsCat[category._id] = category.count;
          });
      
          statusCounts.forEach((status) => {
            formattedCountsStatus[status._id] = status.count;
          });
      
          res.json({ categories: formattedCountsCat, status: formattedCountsStatus });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      
}


module.exports = ReportController;
