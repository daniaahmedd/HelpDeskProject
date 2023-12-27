const CustomizationModel = require("../Models/CustomizationModel");
require('dotenv').config();

const CustomizationController = {
  createCustomization: async (req, res) => {
    try {
      const customization = new CustomizationModel(req.body);
      const newCustomization = await customization.save();
      return res.status(201).json({  newCustomization });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Update the customization data
  updateCustomization: async (req, res) => {
    try {
      const condition = { organizationName: "Staff Help Desk Software" };
  
      const customization = await CustomizationModel.findOneAndUpdate(
        condition,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!customization) {
        return res.status(404).json({ error: 'Customization not found' });
      }
  
      return res.status(200).json({ customization, message: 'Customization updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  
  getCustomization: async (req, res) => {
    try {
      const customization = await CustomizationModel.findOne();
  
      if (!customization) {
        return res.status(404).json({ error: 'Customization not found' });
      }
  
      return res.status(200).send( customization );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CustomizationController;
