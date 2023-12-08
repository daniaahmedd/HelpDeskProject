const workFlowModel = require('../Models/workFlowModel');
const ticketModel = require('../Models/ticketModel');
const agentModel = require('../Models/agentModel');




const workFlowController = {

    getAllWorkFlow: async (req, res) => {
        try {
            const { category, subcategory } = req.body;

            if (!category && !subcategory) {
                return res.status(400).json({ message: "Category and subcategory must be provided" });
            }

            const workFlow = await workFlowModel.find({ category, subcategory },{expectedSolution:1 , _id:0});

            if (!workFlow || workFlow.length === 0) {
                return res.status(404).json({ message: `No workflows found for category: ${category} and subcategory: ${subcategory}` });
            }

            return res.status(200).json(workFlow);

        } catch (error) {
            return res.status(500).json({ message: `An error occurred while fetching workflows: ${error.message}` });
        }
    },

    
loadDistributionMap : {
    'Agent 1': ['Software', 'Medium Network', 'Low Hardware'],
    'Agent 2': ['Hardware', 'Medium Software', 'Low Network'],
    'Agent 3': ['Network', 'Medium Hardware', 'Low Software']
},
// Priority queues for tickets
// These queues hold tickets that are waiting to be assigned to an agent
let highPriorityTickets = [],
let mediumPriorityTickets = [],
let lowPriorityTickets = [];

// Function to assign ticket based on agent availability and ticket priority
async function assignTicket() {
    // Select a ticket from the highest priority queue that is not empty
    let ticket;
    if (highPriorityTickets.length > 0) {
        ticket = highPriorityTickets.shift();
    } else if (mediumPriorityTickets.length > 0) {
        ticket = mediumPriorityTickets.shift();
    } else if (lowPriorityTickets.length > 0) {
        ticket = lowPriorityTickets.shift();
    }

    if (ticket) {
        // Find an available agent based on the ticket category
        let agent = await Agent.findOne({ categories: majorCategories[ticket.categories], workload: { $lt: 5 } });

        if (!agent) {
            // If no agent is available for the ticket category, find an agent based on the predefined workload distribution
            for (let category of minorCategories[majorCategories[ticket.categories]]) {
                agent = await Agent.findOne({ categories: category, workload: { $lt: 5 } });
                if (agent) break;
            }
        }

        if (agent) {
            // Assign the ticket to the available agent and increment their workload
            ticket.agentid = agent._id;
            agent.workload++;
            await agent.save();
            await ticket.save();
        }
    }
}

// Route to create a new ticket
router.post('/tickets', async (req, res) => {
    try {
        // Create a new ticket from the request body
        const ticket = new Ticket(req.body);

        // Add the ticket to the appropriate priority queue
        if (ticket.priority === 'high') {
            highPriorityTickets.push(ticket);
        } else if (ticket.priority === 'medium') {
            mediumPriorityTickets.push(ticket);
        } else {
            lowPriorityTickets.push(ticket);
        }

        // Try to assign the ticket to an agent
        await assignTicket();

        // Send the ticket back in the response
        res.status(201).send(ticket);
    } catch (error) {
        // If there's an error, send it in the response
        res.status(400).send(error);
    }
});

// Route to update a ticket
router.patch('/tickets/:id', async (req, res) => {
    try {
        // Find the ticket by id
        const ticket = await Ticket.findById(req.params.id);

        // Update the ticket with the request body
        Object.assign(ticket, req.body);

        // Try to assign the ticket to an agent
        await assignTicket();

        // Send the ticket back in the response
        res.send(ticket);
    } catch (error) {
        // If there's an error, send it in the response
        res.status(400).send(error);
    }
});
};
module.exports = workFlowController;