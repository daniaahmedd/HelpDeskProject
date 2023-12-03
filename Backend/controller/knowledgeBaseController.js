const { subtle } = require("crypto");
const knowledgeBaseModel = require("../Models/knowledgeBaseModel");


const knowledgeBaseController = {

viewknowledgeBase:async(req,res)=>{
  try{
    const allowedCategories = ['Software', 'Hardware', 'Network'];
    const allowedSubCatogries=['Desktops','Laptops','Printers','Servers','Networking equipment','Operating system','Application software','Custom software','Integration issues','Email issues','Internet connection problems','Website errors']
    const { Category, Subcategory } = req.body;

    if (!allowedCategories.includes(Category)) {
      const data = await knowledgeBaseModel.find();
      return res.status(200).json(data);
    }
    if (!allowedSubCatogries.includes(Subcategory)){
      if(allowedCategories.includes(Category)){
      const data = await knowledgeBase.find(Category);
      return res.status(200).json(data);

    }
    else{
      const data = await knowledgeBase.find();
      return res.status(200).json(data);

    }

    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }

  // Check if category is null
},
};
