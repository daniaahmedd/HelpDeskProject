const workFlowModel = require('../Models/workFlowModel');
const ticketModel = require('../Models/ticketModel');
const agentModel = require('../Models/agentModel');

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

async function calculateWorkloadDistribution() {
    const maxWorkloadPerAgent = 5;

    for (const agent of agents) {
        const workloadByExpertise = {};
        let totalWorkload = 0;

        for (const ticketId of agent.workload) {
            if (totalWorkload >= maxWorkloadPerAgent)
            break;

            try {
                const ticket = await ticketModel.findById(ticketId);
                const expertise = getExpertise(ticket.category);
                workloadByExpertise[expertise] = (workloadByExpertise[expertise] || 0) + 1;
                totalWorkload++;
            } catch (error) {
                console.error(`Failed to find ticket with id ${ticketId}: `, error);
            }
        }

        if (totalWorkload > maxWorkloadPerAgent) {
            agent.workload = agent.workload.slice(0, maxWorkloadPerAgent);
        }

        agent.workloadDistribution = workloadByExpertise;

        try {
            await agentModel.findByIdAndUpdate(agent._id, agent);
        } catch (error) {
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