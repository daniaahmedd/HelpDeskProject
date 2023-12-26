
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
        const timeOfOpenedTicket = new Date();

        let reportData;
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
                ticketId: req.params.ticketId,
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
                ticketId: req.params.ticketId,
            };
        }

        // Create a new report based on the provided data
        const newReport = await reportModel.create(reportData);

        return res.status(201).json(newReport);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }


// Export the function for use in your routes
module.exports = {
    createReport,
};

},


    getReport:async (req, res) =>{
        try {
            const report = await report.findById(req.params.reportid);
            return res.status(200).json(report);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    },

    getTrends: async (req, res) =>{
        try {
            const starttime= req.body.starttime;
            const closetime= req.body.closetime;
            const reports = await report.find({opendtime:starttime , closedtime:closetime});
            if(! reports){
                return res.status(500).send("There is no reports in this time interval");
            }
            const ticketId = await reports.ticketId ; // array of ticketids
            const categories = await ticketId.map(async (id)=>{
                const ticket = await ticket.findById(id);
                return ticket.categories
            } )
            const subcategories = await ticketId.map(async (id)=>{
                const ticket = await ticket.findById(id);
                return ticket.subcategories
            } )
            var os = 0;
            var AppSoftware = 0;
            var CustomSoftware = 0;
            var IntegrationIssues = 0;
            var  EmailIssues = 0;
            var InternetConnection = 0;
            var WebsiteErrors = 0;
            var Desktops = 0;
            var Laptops = 0;
            var Printers = 0;
            var Servers = 0;
            var Networking = 0;
            var Software = 0;
            var Hardware = 0;
            var Network = 0;

            await subcategories.map((subcategories)=>{
                switch(subcategories) {
                    case "Desktops": 
                        Desktops++ ;
                        Hardware++;
                        break;
                    case "Laptops" : 
                        Laptops++ ; 
                        Hardware++;
                        break;
                    case "Printers" : 
                        Printers++; 
                        Hardware++;
                        break;
                    case "Servers": 
                        Servers++; 
                        Hardware++;
                        break;
                    case "Networking equipment": 
                        Networking++;  
                        Hardware++;
                        break;
                    case "Operating system" : 
                        os++;  
                        Software++;
                        break;
                    case "Application software": 
                        AppSoftware++; 
                        Software++;
                        break;
                    case "Custom software": 
                        CustomSoftware++;  
                        Software++;
                        break;
                    case "Integration issues" : 
                        IntegrationIssues++; 
                        Software++;
                        break;
                    case "Email issues" : 
                        EmailIssues++;  
                        Network++;
                        break;
                    case "Internet connection problems" : 
                        InternetConnection++;  
                        Network++;
                        break;
                    case "Website errors" : 
                        WebsiteErrors++; 
                        Network++;
                        break;
                }
                subcateg = [os, AppSoftware, CustomSoftware, IntegrationIssues, EmailIssues, 
                      InternetConnection, WebsiteErrors,Desktops, Laptops, Printers, Servers, Networking];
                function solution(subcateg) {
                    return Object.keys(subcateg).reduce((prev, cur) => subcateg[prev] > subcateg[cur] ? prev : cur);
                }
                solution(subcateg)
            })
            //==========creating categery histogram================ 
            const options = {
                d3Module: d3,
                selector: '#chart',
                container: '<div id="container"><div id="chart"></div></div>'
            };
              
            // Create a d3-node object with the selector and the required d3 module. 
            const d3n = new D3Node(options);
            
            const margin = {
            top: 10, right: 5, bottom: 30, left: 5 
            };
            const width = 1000 - margin.left - margin.right;
            const height = 450 - margin.top - margin.bottom;
            const svgWidth = width + margin.left + margin.right;
            const svgHeight = height + margin.top + margin.bottom;
            
            // Create an svg element with the width and height defined.
            const svg = d3n.createSVG(svgWidth, svgHeight);
            const tempData = [{ category:"Hardware", value: Hardware }, { category: "Software", value: Software }, { category: "Network", value: Network }];
            // Create the scales for x-axis and y-axis.
            const xScale = d3.scaleBand().range([0, width]).padding(0.4);
            const yScale = d3.scaleLinear().range([height, 0]);

            let yMax = d3.max(tempData, (d) => { return d.value; });
            yMax += yMax * 0.3;
            xScale.domain(tempData.map((d) => { return d.category; }));
            yScale.domain([0, yMax]);
            // Set the background of the entire svg to a desired color. This will make the background look uniform on everyone's computer.
            svg.append('rect')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('fill', 'white');

            // Add a title text to your bar chart. 
            svg.append('text')
                .attr('transform', 'translate(150,0)')
                .attr('x', 50)
                .attr('y', 50)
                .attr('font-size', '24px')
                .text('categories chart');

            // Append a group element to which the bars and axes will be added to.
            svg.append('g').attr('transform', `translate(${ 100 },${ 100 })`);
            // Appending x-axis
            svg.append('g')
                .attr('transform', `translate(50,${ height })`)
                .call(d3.axisBottom(xScale))
                .append('text')
                .attr('y', height - 380)
                .attr('x', width - 500)
                .attr('text-anchor', 'end')
                .attr('stroke', 'black')
                .attr('font-size', '20px')
                .text('categories');
            // Appending y-aixs
            svg.append('g')
                .attr('transform', 'translate(50,0)')
                .call(d3.axisLeft(yScale).tickFormat((d) => {
                return `$${ d }`;
                })
                .ticks(5))
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 150)
                .attr('x', -150)
                .attr('dy', '-9.1em')
                .attr('text-anchor', 'end')
                .attr('stroke', 'black')
                .attr('font-size', '20px')
                .text('values');
             // Appending the bars
            svg.selectAll('.bar')
                .data(tempData)
                .enter().append('rect')
                .attr('transform', 'translate(50,0)')
                .attr('class', 'bar')
                .attr('x', (d) => { return xScale(d.category); })
                .attr('y', (d) => { return yScale(d.value); })
                .attr('width', xScale.bandwidth())
                .attr('height', (d) => { return height - yScale(d.value); })
                .style('fill', 'purple');
            // Create a SVG. 
            fs.writeFileSync('out.svg', d3n.svgString());

            // Convert the SVG into a PNG. 
            sharp('out.svg')
                .png()
                .toFile('sharp.png')
                .then((info) => {
                    console.log('Svg to Png conversion completed', info);
                })
                .catch((err) => {
                    console.log(err);
                });  
                
            //--------------------------------------------------------------------------------------------//
            const status = await ticketId.map(async (id)=>{
                const ticket = await ticket.findById(id);
                return ticket.status
            } )

            var opened   = 0;
            var closed  = 0;
            var Pending = 0;
            var clanceled  = 0;

            await status.map((status)=>{
                switch(status) {
                    case "Opened": 
                        opened++ ;
                        break;
                    case "Closed": 
                        closed++ ;
                        break;
                    case "Pending": 
                        Pending++ ;
                        break;  
                    case "Canceled": 
                        clanceled++ ;
                        break;        
                }
            });
            //=================create status histogram================
              
            // Create a d3-node object with the selector and the required d3 module. 
            const svg2 = d3n.createSVG(svgWidth, svgHeight);
            const tempData2 = [{ status:"Opened", value: opened }, { status: "Closed", value: closed }, { status: "Pending", value: Pending },{status:"Clanceled" , value:clanceled}];
            // Set the background of the entire svg to a desired color. This will make the background look uniform on everyone's computer.
            svg2.append('rect')
                .attr('width', '100%')
                .attr('height', '100%')
                .style('fill', 'white');

            // Add a title text to your bar chart. 
            svg2.append('text')
                .attr('transform', 'translate(150,0)')
                .attr('x', 50)
                .attr('y', 50)
                .attr('font-size', '24px')
                .text('status chart');

            // Append a group element to which the bars and axes will be added to.
            svg2.append('g').attr('transform', `translate(${ 100 },${ 100 })`);
            // Appending x-axis
            svg2.append('g')
                .attr('transform', `translate(50,${ height })`)
                .call(d3.axisBottom(xScale))
                .append('text')
                .attr('y', height - 380)
                .attr('x', width - 500)
                .attr('text-anchor', 'end')
                .attr('stroke', 'black')
                .attr('font-size', '20px')
                .text('status');
            // Appending y-aixs
            svg2.append('g')
                .attr('transform', 'translate(50,0)')
                .call(d3.axisLeft(yScale).tickFormat((d) => {
                return `$${ d }`;
                })
                .ticks(5))
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 150)
                .attr('x', -150)
                .attr('dy', '-9.1em')
                .attr('text-anchor', 'end')
                .attr('stroke', 'black')
                .attr('font-size', '20px')
                .text('values');
             // Appending the bars
            svg2.selectAll('.bar')
                .data(tempData2)
                .enter().append('rect')
                .attr('transform', 'translate(50,0)')
                .attr('class', 'bar')
                .attr('x', (d) => { return xScale(d.status); })
                .attr('y', (d) => { return yScale(d.value); })
                .attr('width', xScale.bandwidth())
                .attr('height', (d) => { return height - yScale(d.value); })
                .style('fill', 'purple');
            // Create a SVG. 
            fs.writeFileSync('out2.svg', d3n.svgString());

            // Convert the SVG into a PNG. 
            sharp('out2.svg')
                .png()
                .toFile('sharp2.png')
                .then((info) => {
                    console.log('Svg to Png conversion completed', info);
                })
                .catch((err) => {
                    console.log(err);
                });  
                
        }catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
module.exports = ReportController ;