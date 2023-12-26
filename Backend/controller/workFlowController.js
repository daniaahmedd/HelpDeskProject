const workFlowModel = require('../Models/WorkFlowModel');
const ticketModel = require('../Models/ticketModel');
const agentModel = require('../Models/agentModel');

const MAX_WORKLOAD_PER_AGENT = 5;

const TicketRouter = {
    agents: [], 
    queues: { highPriority: [], mediumPriority: [], lowPriority: [] }, 

    async init() {
        try {
            await this.loadAgents();
            setInterval(this.processQueues.bind(this), 1000);
        } catch (error) {
            console.error('Initialization error:', error);
        }
    },

    async loadAgents() {
        try {
            const agentsData = await agentModel.find({}).limit(3);
            this.agents = agentsData.map(agent => ({
                ...agent._doc, 
                currentLoad: agent.workload.length,
                expertise: {
                    primary: agent.primaryExpertise,
                    secondary: agent.secondaryExpertise,
                    tertiary: agent.tertiaryExpertise
                }
            }));
        } catch (error) {
            console.error('Error loading agents:', error);
        }
    },

    getExpertise(category) {
        const expertiseMap = { 'Software': 'software', 'Hardware': 'hardware', 'Network': 'network' };
        return expertiseMap[category] || null;
    },

    findAvailableAgent(category) {
        let availableAgent = this.agents.find(agent => 
            agent.expertise.primary === category && agent.currentLoad < MAX_WORKLOAD_PER_AGENT
        );

        if (!availableAgent) {
            availableAgent = this.agents.find(agent =>
                agent.expertise.secondary === category && agent.currentLoad < MAX_WORKLOAD_PER_AGENT
            );
        }

        if (!availableAgent) {
            availableAgent = this.agents.find(agent =>
                agent.expertise.tertiary === category && agent.currentLoad < MAX_WORKLOAD_PER_AGENT
            );
        }

        return availableAgent || null;
    },

    async assignTicket(ticket) {
        try {
            const category = this.getExpertise(ticket.category);
            if (!category) throw new Error('Invalid ticket category');

            const availableAgent = this.findAvailableAgent(category);
            if (availableAgent) {
                await this.updateAgentLoad(availableAgent, 1);
                await this.updateTicketStatus(ticket, 'Pending', availableAgent._id);
            } else {
                this.queueTicket(ticket);
            }
        } catch (error) {
            console.error('Error assigning ticket:', error);
        }
    },

    async updateAgentLoad(agent, increment) {
        try {
            agent.currentLoad += increment;
            await agentModel.findByIdAndUpdate(agent._id, { $set: { currentLoad: agent.currentLoad } });
        } catch (error) {
            console.error(`Error updating agent's load:`, error);
        }
    },

    async updateTicketStatus(ticket, status, agentId = null) {
        try {
            const update = { status: status };
            if (agentId) update.assignedTo = agentId;
            await ticketModel.findByIdAndUpdate(ticket._id, { $set: update });
        } catch (error) {
            console.error(`Error updating ticket status:`, error);
        }
    },

    queueTicket(ticket) {
        try {
            const queue = this.queues[`${ticket.priority}Priority`];
            if (queue) queue.push(ticket);
            else throw new Error('Invalid ticket priority');
        } catch (error) {
            console.error('Error queuing ticket:', error);
        }
    },

    async processQueues() {
        try {
            await this.processQueue(this.queues.highPriority);
            await this.processQueue(this.queues.mediumPriority);
            await this.processQueue(this.queues.lowPriority);
        } catch (error) {
            console.error('Queue processing error:', error);
        }
    },

    async processQueue(queue) {
        try {
            while (queue.length > 0) {
                const ticket = queue.shift();
                await this.assignTicket(ticket);
            }
        } catch (error) {
            console.error('Error processing queue:', error);
        }
    }
};

const workFlowController = {
    async getAllWorkFlow(req, res) {
        try {
            const { category, subcategory } = req.body;
            if (!category || !subcategory) {
                return res.status(400).json({ message: "Category and subcategory must be provided" });
            }

            const workflows = await workFlowModel.find({ category, subcategory });
            if (workflows.length === 0) {
                return res.status(404).json({ message: `No workflows found for category: ${category} and subcategory: ${subcategory}` });
            }

            res.json({ message: "Workflows successfully retrieved", data: workflows });
        } catch (error) {
            console.error('Error fetching workflows:', error);
            res.status(500).json({ message: `Error fetching workflows: ${error.message}` });
        }
    }
};

TicketRouter.init();
module.exports = workFlowController;
