const CustomizationModel = require("../Models/CustomizationModel");
require('dotenv').config();

const CustomizationController = {
  createCustomization: async (req, res) => {
    try {
      const customization = new CustomizationModel(req.body);
      const newCustomization = await customization.save();
      return res.status(201).json(newCustomization);
    } catch (error) {
      return res.status(400).json({ message: error.message });
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
        return res.status(404).json({ msg: 'Customization not found' });
      }
  
      return res
        .status(200)
        .json({ customization, msg: 'Customization updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  
  getCustomization: async (req, res) => {
    try {
      const customization = await CustomizationModel.findOne();
  
      if (!customization) {
        return res.status(404).json({ message: 'Customization not found' });
      }
  
      return res.status(200).json(customization);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};



module.exports = CustomizationController;
