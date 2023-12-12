const workFlowModel = require('../Models/workFlowModel');
const ticketModel = require('../Models/ticketModel');
const agentModel = require('../Models/agentModel');
const assignOrQueueTicket = require('../utils/assignOrQueueTicket');

let agents = [];

const highPriorityQueue = [];
const mediumPriorityQueue = [];
const lowPriorityQueue = [];

function getExpertise(category) {

    const expertiseMap = {
        'category1': 'software',
        'category2': 'hardware',
        'category3': 'network',
    };

    return expertiseMap[category] || 'unknown';
}

async function loadAgents() {
    try {
        agents = await agentModel.find().limit(3);
        calculateWorkloadDistribution();
    } catch (error) {
        console.error(`Error loading agents: ${error}`);
    }
}

function findAvailableAgent(major, expertise) {
    return agents.find(
        agent =>
            agent.major === major && agent.expertise === expertise && agent.workload.length < agent.maxWorkload && agent.workloadDistribution[expertise] > 0
    );
}

async function assignTicketToAgent(ticket, agent) {
    agent.workload.push(ticket._id);
    agent.workloadDistribution[getExpertise(ticket.category)]--;

    ticket.assigned = true;
    ticket.status = 'Pending';

    ticket.assignedTo = agent._id;
    ticket.assignedAt = Date.now();

    await ticket.save();
    await agent.save();

    await ticketModel.findByIdAndUpdate(ticket._id, ticket);
    await agentModel.findByIdAndUpdate(agent._id, agent);
}

async function assignOrQueueTicket(ticket) {

    const { major, expertise } = getExpertise(ticket.category);
    let availableAgent = findAvailableAgent(major, expertise);

    if (availableAgent) {
        await assignTicketToAgent(ticket, availableAgent);
        availableAgent.workloadDistribution[expertise]--;
    } 
    else {
        if (ticket.priority === "medium") {
            availableAgent = agents.find(agent => agent.workloadDistribution[major] > 0);
            if (availableAgent) {
                await assignTicketToAgent(ticket, availableAgent);
                availableAgent.workloadDistribution[major]--;
            } 
            else {
                mediumPriorityQueue.push(ticket);
            }
        } 
        else if (ticket.priority === "high") {
            availableAgent = agents.find(agent => agent.workloadDistribution[major] > 0);
            if (availableAgent) {
                await assignTicketToAgent(ticket, availableAgent);
                availableAgent.workloadDistribution[major]--;
            } 
            else {
                highPriorityQueue.push(ticket);
            }
        } 
        else if (ticket.priority === "low") {
            availableAgent = agents.find(agent => agent.workload < agent.maxWorkload);
            if (availableAgent) {
                await assignTicketToAgent(ticket, availableAgent);
            } 
            else {
                lowPriorityQueue.push(ticket);
            }
        }
    }
}

// Define an asynchronous function named calculateWorkloadDistribution
async function calculateWorkloadDistribution() {
    // Define a constant for the maximum workload per agent
    const maxWorkloadPerAgent = 5;

    // Loop over each agent in the agents array
    for (const agent of agents) {
        // Initialize an empty object to store the workload distribution by expertise
        const workloadByExpertise = {};
        // Initialize a variable to keep track of the total workload
        let totalWorkload = 0;

        // Loop over each ticket in the agent's workload
        for (const ticketId of agent.workload) {
            // If the total workload reaches the maximum, stop processing tickets
            if (totalWorkload >= maxWorkloadPerAgent)
            break;

            try {
                // Fetch the ticket from the database using its ID
                const ticket = await ticketModel.findById(ticketId);
                // Determine the expertise required for the ticket
                const expertise = getExpertise(ticket.category);
                // Increment the count of tickets for that expertise in workloadByExpertise
                workloadByExpertise[expertise] = (workloadByExpertise[expertise] || 0) + 1;
                // Increment the total workload
                totalWorkload++;
            } catch (error) {
                // If there's an error while fetching the ticket, log the error to the console
                console.error(`Failed to find ticket with id ${ticketId}: `, error);
            }
        }

        // If the total workload exceeds the maximum workload per agent, trim the agent's workload to the maximum
        if (totalWorkload > maxWorkloadPerAgent) {
            agent.workload = agent.workload.slice(0, maxWorkloadPerAgent);
        }

        // Update the agent's workloadDistribution with workloadByExpertise
        agent.workloadDistribution = workloadByExpertise;

        try {
            // Update the agent in the database
            await agentModel.findByIdAndUpdate(agent._id, agent);
        } catch (error) {
            // If there's an error while updating the agent, log the error to the console
            console.error(`Failed to update agent with id ${agent._id}: `, error);
        }
    }
}

async function checkQueues() {

    const queues = [highPriorityQueue, mediumPriorityQueue, lowPriorityQueue];
    for (const queue of queues) {

        for (let i = 0; i < queue.length; i++) {
            const ticket = queue[i];
            const { major, expertise } = getExpertise(ticket.category);
            const availableAgent = findAvailableAgent(major, expertise);

            if (availableAgent) {
                await assignTicketToAgent(ticket, availableAgent);
                queue.splice(i, 1);
                i--;
            }
        }
    }
}

setInterval(checkQueues, 1000);

loadAgents();

const workFlowController = {

    getAllWorkFlow: async (req, res) => {
        try {
            const { category, subcategory } = req.body;

            if (!category && !subcategory) {
                return res.status(400).json({ message: "Category and subcategory must be provided" });
            }

            const workFlow = await workFlowModel.find({ category, subcategory }, { expectedSolution: 1, _id: 0 });
            if (!workFlow || workFlow.length === 0) {
                return res.status(404).json({ message: `No workflows found for category: ${category} and subcategory: ${subcategory}` });
            }

            workFlow.forEach(ticket => {
                if (category === 'category1') {
                    ticket.priority = 'high';
                } else if (category === 'category2') {
                    ticket.priority = 'medium';
                } else {
                    ticket.priority = 'low';
                }
                assignOrQueueTicket(ticket);
            });
            return res.status(200).json(workFlow);

        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while fetching workflows: ' + error.message });
        }
    },
    
};


module.exports = workFlowController;