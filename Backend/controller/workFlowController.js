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

            const workFlow = await workFlowModel.find({ category, subcategory });

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

assignTicket: async (req, res) => {
    try {
        const agents = await agentModel.find({ availability: true }).sort({ workload: 1 }).exec();

        const highPriorityTickets = await ticketModel.find({ agentAssigned: null, priority: 'high' }).exec();
        const mediumPriorityTickets = await ticketModel.find({ agentAssigned: null, priority: 'medium' }).exec();
        const lowPriorityTickets = await ticketModel.find({ agentAssigned: null, priority: 'low' }).exec();

        // Function to assign tickets to available agents
        // This function takes a list of tickets and assigns each ticket to an available agent
        const assignTickets = async (tickets, priority) => {
            for (let ticket of tickets) {
                // Try to find an available agent with matching major and workload less than 5
                // This ensures that tickets are assigned to agents who are experts in the ticket's major
                let availableAgent = agents.find(agent => agent.major === ticket.major && agent.workload < 5);

                // If no agent with matching major is available, assign based on the predefined load distribution
                // This ensures that tickets are still assigned even if no agents with the same major are available
                if (!availableAgent) {
                    for (let agentName in loadDistributionMap) {
                        const agentExpertise = loadDistributionMap[agentName];
                        if (agentExpertise.includes(priority + ' ' + ticket.major)) {
                            availableAgent = agents.find(agent => agent.name === agentName && agent.workload < 5);
                            if (availableAgent) break;
                        }
                    }
                }

                // If an available agent is found, assign the ticket to the agent and update the ticket and agent's status
                if (availableAgent) {
                    ticket.agentAssigned = availableAgent._id;
                    ticket.status = 'pending';
                    availableAgent.workload++;
                    availableAgent.availability = availableAgent.workload < 5;
                    await Promise.all([ticket.save(), availableAgent.save()]);
                }
            }
        };

        // Assign tickets based on their priority
        // High priority tickets are assigned first, followed by medium and low priority tickets
        await assignTickets(highPriorityTickets, 'high');
        await assignTickets(mediumPriorityTickets, 'medium');
        await assignTickets(lowPriorityTickets, 'low');

        // If all operations are successful, send a success message
        res.status(200).send('Tickets assigned successfully');
    } catch (error) {
        // If an error occurs, log the error and send an error message
        console.error(error);
        res.status(500).send('An error occurred while assigning tickets');
    }
},

};

module.exports = workFlowController;