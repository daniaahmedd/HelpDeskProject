const knowledgeBaseModel = require("../Models/knowledgeBaseModel");

const knowledgeBaseController = {
  viewknowledgeBase: async (req, res) => {
    try {
      const allowedCategories = ["Software", "Hardware", "Network"];
      const allowedSubCatogries = [
        "Desktops",
        "Laptops",
        "Printers", 
        "Servers",
        "Networking equipment",
        "Operating system",
        "Application software",
        "Custom software",
        "Integration issues",
        "Email issues",
        "Internet connection problems",
        "Website errors",
      ];
      // const items = await knowledgeBaseModel.find().lean().exec();
      // return res.json({items})
      
      const { question_category, question_subcategory } = req.body;


      if (question_category==""&&question_subcategory=="") {
        const data = await knowledgeBaseModel.find().lean().exec();
        return res.status(200).json(data);
      }
      
      if (allowedCategories.includes(question_category) && allowedSubCatogries.includes(question_subcategory)) {
          const data = await knowledgeBaseModel.find({question_category,question_subcategory}).lean().exec();
          return res.status(200).json(data);
        } 
        if(allowedCategories.includes(question_category)&& !allowedSubCatogries.includes(question_subcategory) ){
          const data = await knowledgeBaseModel.find({question_category}).lean().exec();
          return res.status(200).json(data);
        }
        if(!allowedCategories.includes(question_category)&& allowedSubCatogries.includes(question_subcategory) ){
          const data = await knowledgeBaseModel.find({question_subcategory}).lean().exec();
          return res.status(200).json(data);
        }
 

       } catch (e) {
      return res.status(500).json({ message: e.message });
    }

    // Check if category is null
  
  }
};
module.exports = knowledgeBaseController;
