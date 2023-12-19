//const workFlowModel = require('../Models/workFlowModel');
// const workFlowModel = require('../Models/workFlowModel');
const ticketModel = require('../Models/ticketModel');
const agentModel = require('../Models/agentModel');


async function calcagentpreformance(userRating , agentId){
  var Userratingsum = 0;
  var countratingnum =0;
  const tickets= await ticketModel.find();
  const genumoftickets = tickets.map((ticket)=>{
    if (ticket.rating){
      countratingnum+=1
      Userratingsum+= ticket.rating
    }

  }) 
  
  var averageofrating = (Userratingsum/countratingnum) / 100;
  const agentrating = await agentModel.findByIdAndUpdate(
   agentId,
    { Agentrating : averageofrating},
    {
      new: true,
    }
  ); 
  console.log(averageofrating)    
  console.log(countratingnum)
}

const TicketController = {

    createTicket: async (req, res) => {
        const ticket = new ticketModel({
            categories: req.body.categories,
            subcategories: req.body.subcategories,
            issueDescription: req.body.issueDescription,
        });
    
    const valuePriorityMap = {
        1: 'High',
        2: 'Medium',
        3: 'Low'
    };

    function assignPriority(subcategories) {
        let value;
        if (subcategories === 'Desktops' || subcategories === 'Laptops' || subcategories === 'Operating system'
         || subcategories === 'Application software') {
          value = 2;
        } else if (subcategories === 'Printers' || subcategories === 'Servers' 
          || subcategories === 'Networking equipment' || subcategories === 'Integration issues' 
          || subcategories === 'Internet connection problems' || subcategories === 'Website errors') {
        value = 1;
       } else if (subcategories === 'Custom software' || subcategories === 'Email issues')
        value = 3;
        else{
        value = 0;
      }
    
      const priority = valuePriorityMap[value] || 'Unknown';

      return priority;
    }},
    updateTicket: async (req, res) => {
        const ticket = new ticketModel({
            ticketId: req.body.ticketId,
            status: req.body.status,
            issueSolution: req.body.issueSolution,
        });
        try{
        const updatedTicket = await ticketModel.findOneAndUpdate(
            { _id: ticket.ticketId },
            { status, issueSolution },
            { new: true }
          );
        const userEmail = updatedTicket.userEmail; // Assuming you have the user's email stored in the ticket object
        const emailContent = `Your ticket (ID: ${ticket.ticketId}) has been updated.\n\nStatus:
         ${ticket.status}\n\nIssue Solution: ${ticket.issueSolution}`;

        // Logic to send the email to the user (using a library or custom implementation)
        sendEmail(userEmail, 'Ticket Update', emailContent);

        // Return the updated ticket or a success message
        res.json({ success: true, updatedTicket });

        } catch (error) {
        // Handle any errors that occur during the update or email sending
        console.error('Error updating ticket:', error);
        res.status(500).json({ success: false, error: 'Failed to update ticket and send email.' });
    }},
    rateTicket: async (req, res) => {
        
        try {
            const ticket = await ticketModel.findById(req.params.ticketid);
            if (!ticket) {
              return res.status(404).json({ success: false, error: 'Ticket not found' });
            }
            const ticketdata = await ticketModel.findByIdAndUpdate(
                req.params.ticketid,
                { rating: req.body.rating },
                {
                  new: true,
                }
              );   
              calcagentpreformance(req.body.rating, ticket.agentid)    
              return res.status(201).send("updated");
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
    }  
};
// Start the server
  // app.listen(3000, () => {
  // console.log('Server listening on port 3000');
  //  });
  //   if (subcategories) {
  //       ticket.agentAssigned = availableAgent._id;
  //       ticket.status = 'pending';
  //       availableAgent.workload++;
  //       availableAgent.availability = availableAgent.workload < 5;
  //       await Promise.all([ticket.save(), availableAgent.save()]);
  //   }

module.exports = TicketController;
