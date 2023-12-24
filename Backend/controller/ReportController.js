
const ticketschema = require('../Models/ticketModel');
const D3Node = require('d3-node');
const d3 = require('d3');
const fs = require('fs');
const sharp = require('sharp');
const reportModel = require('../Models/reportModel');

const ReportController = {
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
                ticketId: req.params.ticketId,
                Agentrating : ticket.Agentrating
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
            const report = await reportModel.findById(req.params.reportid);
            return res.status(200).json(report);
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
    },

    getTrends: async (req, res) =>{
        try {
            
                const starttime = req.body.starttime;
                const closetime = req.body.closetime;
                const tikets = await ticketschema.find({opendedtime: starttime, closetime: closetime });
            
                if (!tikets || tikets.length === 0) {
                    return res.status(500).send("There are no tickets in this time interval");
                }

                console.log("tikets", tikets)
                const ticketIds = tikets.map((tikets) =>tikets._id);
            
                const subcategoriesPromises = ticketIds.map(async (id) => {
                    const ticket = await ticketschema.findById(id);
                    return ticket ? ticket.subcategories : null;
                });
            
                const subcategories = await Promise.all(subcategoriesPromises);
            
                const categoriesCount = {
                    os: 0,
                    AppSoftware: 0,
                    CustomSoftware: 0,
                    IntegrationIssues: 0,
                    EmailIssues: 0,
                    InternetConnection: 0,
                    WebsiteErrors: 0,
                    Desktops: 0,
                    Laptops: 0,
                    Printers: 0,
                    Servers: 0,
                    Networking: 0,
                };
                var Hardware = 0;
                var Software = 0;
                var Network = 0;
            
                subcategories.forEach((subcategory) => {
                    switch (subcategory) {
                        case "Desktops":
                        case "Laptops":
                        case "Printers":
                        case "Servers": 
                        case "Networking equipment":
                            Hardware++;
                            break;
                        case "Operating system":
                        case "Application software":
                        case "Custom software":
                        case "Integration issues":
                            Software++;
                            break;
                        case "Email issues":
                        case "Internet connection problems":
                        case "Website errors":
                           Network++;
                            break;
                    }
                    categoriesCount[subcategory]++;
                });
               
               console.log("hardware=>",Hardware)
                
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
            fs.writeFileSync('graphs/out.svg', d3n.svgString());

            // Convert the SVG into a PNG. 
            sharp('graphs/out.svg')
                .png()
                .toFile('graphs/sharp.png')
                .then((info) => {
                    console.log('Svg to Png conversion completed', info);
                })
                .catch((err) => {
                    console.log(err);
                });

            //--------------------------------------------------------------------------------------------//
            const statuspromises = await ticketIds.map(async (id)=>{
                const ticket = await ticketschema.findById(id);
                return ticket.status
            } )

            const status = await Promise.all(statuspromises);

            console.log("status=>",status)

            var opened   = 0;
            var closed  = 0;
            var Pending = 0;

            await status.map((status)=>{
                switch(status) {
                    case "Open": 
                        opened++ ;
                        break;
                    case "Closed": 
                        closed++ ;
                        break;
                    case "Pending": 
                        Pending++ ;
                        break;        
                }
            });
            //=================create status histogram================
              console.log("open=>",opened)
              console.log("close=>",closed)

              const options2 = {
                d3Module: d3,
                selector: '#chart2',
                container: '<div id="container2"><div id="chart2"></div></div>'
            };
              
            // Create a d3-node object with the selector and the required d3 module. 
            const d3n2 = new D3Node(options2);

            const margin2 = {
                top: 10, right: 5, bottom: 30, left: 5 
                };
                const width2 = 1000 - margin.left - margin.right;
                const height2 = 450 - margin.top - margin.bottom;
                const svgWidth2 = width2 + margin.left + margin.right;
                const svgHeight2 = height2 + margin.top + margin.bottom;
                
            // Create a d3-node object with the selector and the required d3 module. 
            const svg2 = d3n2.createSVG(svgWidth2, svgHeight2);
            const tempData2 = [{ status:"Open", value: opened }, { status: "Closed", value: closed }, { status: "Pending", value: Pending }];
            // Set the background of the entire svg to a desired color. This will make the background look uniform on everyone's computer.
            const xScale2 = d3.scaleBand().range([0, width2]).padding(0.4);
            const yScale2 = d3.scaleLinear().range([height2, 0]);

            let yMax2 = d3.max(tempData2, (d) => { return d.value; });
            yMax2 += yMax2 * 0.3;
            xScale2.domain(tempData2.map((d) => { return d.status; }));
            yScale2.domain([0, yMax2]);

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
                .text(' status chart');

            // Append a group element to which the bars and axes will be added to.
            svg2.append('g').attr('transform', `translate(${ 100 },${ 100 })`);
            // Appending x-axis
            svg2.append('g')
                .attr('transform', `translate(50,${ height2 })`)
                .call(d3.axisBottom(xScale2))
                .append('text')
                .attr('y', height2 - 380)
                .attr('x', width2 - 500)
                .attr('text-anchor', 'end')
                .attr('stroke', 'black')
                .attr('font-size', '20px')
                .text('status');
            // Appending y-aixs
                svg2.append('g')
                    .attr('transform', 'translate(50,0)')
                    .call(d3.axisLeft(yScale2).tickFormat((d) => {
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
                    .attr('x', (d) => { return xScale2(d.status); })
                    .attr('y', (d) => { return yScale2(d.value); })
                    .attr('width', xScale2.bandwidth())
                    .attr('height', (d) => { return height2 - yScale2(d.value); })
                    .style('fill', 'purple');
                // Create a SVG. 
                fs.writeFileSync('graphs/out2.svg', d3n2.svgString());
                sharp('graphs/out2.svg')
                    .png()
                    .toFile('graphs/sharp2.png')
                    .then((info) => {
                        console.log('Svg to Png conversion completed', info);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
  

                    return res.status(200).send("done")
                } catch (error) {
                    //console.error("Error during chart generation:", error);
                    return res.status(400).json({ message: error.message });
                }
    }
};
module.exports = ReportController ;