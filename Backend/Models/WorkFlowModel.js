const mongoose = require('mongoose');
const WorkFlowSchema = new mongoose.Schema(
    {
        category:{
           type:String,
           enum:[ "Software", "Hardware", "Network"],
           required:true
        },
        subcategory:{
            type:String,
            enum:["Desktops", "Laptops", "Printers", "Servers", "Networking equipment", 
            " Operating system"," Application software"," Custom software"," Integration issues",
            "Email issues", "Internet connection problems", "Website errors"],
            required:true,
            unique:true
        },
        expectedSolution:{
            type:String,
            required:true
        }
    },
    {
        strict :true
    }
)
WorkFlow = mongoose.model ('WorkFlowModel', WorkFlowSchema);
module.exports = WorkFlow;
