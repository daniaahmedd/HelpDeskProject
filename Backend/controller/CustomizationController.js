const CustomizationModel = require("../Models/CustomizationModel");



const CustomizationModel = {

  createCustomization: async (req, res) => {
    try {
      const customization = new CustomizationModel({
        organizationName: req.body.organizationName,
        logoURL: req.body.logoURL,
        primaryColor: req.body.primaryColor,
        secondaryColor: req.body.secondaryColor,
        accentColor: req.body.accentColor,
        backgroundColor: req.body.backgroundColor,
        titlesFontColor: req.body.titlesFontColor,
        fontColor: req.body.fontColor,
        titlesFontSize: req.body.titlesFontSize,
        fontSize: req.body.fontSize,
        titlesFontFamily: req.body.titlesFontFamily,
        fontFamily: req.body.fontFamily,
        logoHeight: req.body.logoHeight,
        logoWidth: req.body.logoWidth,
        logoBorderColor: req.body.logoBorderColor,
        logoBackgroundColor: req.body.logoBackgroundColor,
        headerHeight: req.body.headerHeight,
        headerWidth: req.body.headerWidth,
        headerBackgroundColor: req.body.headerBackgroundColor,
      });

      const newCustomization = await customization.save();
      return res.status(201).json(newCustomization);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

    
updateCustomization: async (req, res) => {
        const customizationId = req.params.customizationId;
    
        try {
          const existingCustomization = await CustomizationModel.findById(customizationId);
    
          if (!existingCustomization) {
            return res.status(404).json({ message: 'Customization not found' });
          }
    
          // Update the fields with the values from the request body
          existingCustomization.organizationName = req.body.organizationName;
          existingCustomization.logoURL = req.body.logoURL;
          existingCustomization.primaryColor = req.body.primaryColor;
          existingCustomization.secondaryColor = req.body.secondaryColor;
          existingCustomization.accentColor = req.body.accentColor;
          existingCustomization.backgroundColor = req.body.backgroundColor;
          existingCustomization.titlesFontColor = req.body.titlesFontColor;
          existingCustomization.fontColor = req.body.fontColor;
          existingCustomization.titlesFontSize = req.body.titlesFontSize;
          existingCustomization.fontSize = req.body.fontSize;
          existingCustomization.titlesFontFamily = req.body.titlesFontFamily;
          existingCustomization.fontFamily = req.body.fontFamily;
          existingCustomization.logoHeight = req.body.logoHeight;
          existingCustomization.logoWidth = req.body.logoWidth;
          existingCustomization.logoBorderColor = req.body.logoBorderColor;
          existingCustomization.logoBackgroundColor = req.body.logoBackgroundColor;
          existingCustomization.headerHeight = req.body.headerHeight;
          existingCustomization.headerWidth = req.body.headerWidth;
          existingCustomization.headerBackgroundColor = req.body.headerBackgroundColor;
    
          // Save the updated customization
          const updatedCustomization = await existingCustomization.save();
          return res.status(200).json(updatedCustomization);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      },
    };
    

module.exports = CustomizationModel;
