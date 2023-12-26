const workFlowModel = require('../Models/WorkFlowModel');

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


module.exports = workFlowController;
