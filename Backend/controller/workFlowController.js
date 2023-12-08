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
    
};
module.exports = workFlowController;