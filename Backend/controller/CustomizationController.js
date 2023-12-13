const CustomizationModel = require("../Models/CustomizationModel");



const CustomizationModel = {


    createCustomization: async (req, res) => {
        const customization = new CustomizationModel({
          organizationName : req.body.organizationName,
          logoURL : req.body.logoURL,
          primaryColor : req.body.primaryColor,
          secondaryColor : req.body.secondaryColor,
          accentColor : req.body.accentColor,
          backgroundColor : req.body.backgroundColor,
          titlesFontColor : req.body.titlesFontColor,
          fontColor : req.body.fontColor,
          titlesFontSize : req.body.titlesFontSize,
          fontSize : req.body.fontSize,
          titlesFontFamily : req.body.titlesFontFamily,
          fontFamily : req.body.fontFamily,
          logoHeight : req.body.logoHeight,
          logoWidth : req.body.logoWidth,
          logoBorderColor : req.body.logoBorderColor,
          logoBackgroundColor : req.body.logoBackgroundColor,
          headerHeight : req.body.headerHeight,
          headerWidth : req.body.headerWidth,
          headerBackgroundColor : req.body.headerBackgroundColor,
        });

        try {
          const newCustomization = await customization.save();
          return res.status(201).json(newCustomization);
        } catch (e) {
          return res.status(400).json({ message: e.message });
        }
      },






    //update the customization data


 updateCustomization : async (req, res) => {
    try {
        const customization = await CustomizationModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
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
  };



module.exports = CustomizationModel;
