const knowledgeBaseModel = require('../Models/knowledgeBaseModel');
const mongoose = require('mongoose');

//const db_url = `mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/Software`;
const db_url = 'mongodb://127.0.0.1:27017/try';

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => console.log(e));

async function main(){
    const knowledgeBase1 = new knowledgeBaseModel({
        question_category: "Hardware",
        question_subcategory: "Desktops",
        question:" A staff member reports that their desktop computer is not turning on. What steps should the help desk take?",
        solution :" The help desk should guide the staff member to check if the power cable is properly connected and if the power outlet is working. If the computer still doesn’t turn on, the help desk should create a ticket for a hardware check."
    });
    await knowledgeBase1.save();

    const knowledgeBase2 = new knowledgeBaseModel({
        question_category: "Hardware",
        question_subcategory: "Laptops",
        question:"A staff member complains that their laptop is overheating. How should the help desk respond?",
        solution: "The help desk should advise the staff member to ensure the laptop is on a hard, flat surface for proper ventilation and to regularly clean the air vents. If the problem persists, a hardware check ticket should be created."
    });
    await knowledgeBase2.save();

    const knowledgeBase3 = new knowledgeBaseModel({
        question_category: "Hardware",
        question_subcategory: "Printers",
        question:"A staff member says their printer is not printing clearly. What should the help desk do?",
        solution :"The help desk should guide the staff member to use the printer’s built-in cleaning function. If that doesn’t work, the help desk should suggest checking the ink cartridges and create a ticket if necessary."
    }); 
    await knowledgeBase3.save();

    const knowledgeBase4 = new knowledgeBaseModel({
        question_category: "Hardware",
        question_subcategory: "Servers",
        question:"A staff member reports that they cannot access the company server. What actions should the help desk take?",
        solution:"The help desk should first check the server’s status. If the server is down, the help desk should notify the appropriate team to get it back online."
    });
    await knowledgeBase4.save();

    const knowledgeBase5 = new knowledgeBaseModel({
        question_category: "Hardware",
        question_subcategory: "Networking equipment",
        question:"A staff member is having trouble setting up a new router. How can the help desk assist?",
        solution:"The help desk should guide the staff member through the setup process, ensuring the router is properly connected to the modem and the network."
    });
    await knowledgeBase5.save();

    const knowledgeBase6 = new knowledgeBaseModel({
        question_category: "Software",
        question_subcategory: "Operating system",
        question:"A staff member has installed a new operating system and reports that it’s running slow. What should the help desk suggest?",
        solution:"The help desk should ensure the staff member’s computer meets the system requirements for the new operating system and guide the staff member to check for unnecessary background processes."
    });
    await knowledgeBase6.save();
    
    const knowledgeBase7 = new knowledgeBaseModel({
        question_category: "Software",
        question_subcategory: "Application software",
        question:" A staff member is trying to install a new software application and is getting an error message. How can the help desk help?",
        solution: "The help desk should analyze the error message and guide the staff member through potential solutions, such as checking disk space or system requirements."
    });
    await knowledgeBase7.save();

    const knowledgeBase8 = new knowledgeBaseModel({
        question_category: "Software",
        question_subcategory: "Custom software",
        question:"A staff member reports that a custom software developed for their business is not functioning as expected. What should the help desk do?",
        solution: " The help desk should gather all necessary information about the issue and create a ticket for the software development team to investigate."
    });
    await knowledgeBase8.save();

    const knowledgeBase9 = new knowledgeBaseModel({
        question_category: "Software",
        question_subcategory: "Integration issues",
        question:"A staff member is trying to integrate a new software tool with their existing system and is facing issues. How can the help desk assist?",
        solution:"The help desk should check the integration requirements of both systems and guide the staff member accordingly. If the problem persists, a ticket should be created for further investigation."
    });
    await knowledgeBase9.save();

    const knowledgeBase10 = new knowledgeBaseModel({
        question_category: "Network",
        question_subcategory: "Email issues",
        question:"A staff member is not receiving any emails on their work account. What actions should the help desk take?",
        solution:"The help desk should guide the staff member to check their spam folder, email filters, and inbox capacity. If the issue persists, the help desk should escalate the issue to the email service provider."
    });
    await knowledgeBase10.save();

    const knowledgeBase11 = new knowledgeBaseModel({
        question_category: "Network",
        question_subcategory: "Internet connection problems",
        question:"A staff member reports that their internet connection is very slow. How can the help desk improve it?",
        solution:"The help desk should guide the staff member to reset their router. If the internet is still slow, the help desk should create a ticket to investigate potential issues with the service provider or the staff member’s proximity to the router."
    });
    await knowledgeBase11.save();

    const knowledgeBase12 = new knowledgeBaseModel({    
        question_category: "Network",
        question_subcategory: "Website errors",
        question:"A staff member is trying to access a website but keeps getting a “404 error”. What does this mean and how can the help desk assist?",
        solution:"The help desk should explain that a “404 error” means the page could not be found on the server. They should suggest the staff member to check the URL for any mistakes, or try again later as the webpage might be temporarily down."
    });
    await knowledgeBase12.save();
}
main()
.then(() => console.log("knowledgeBase inserted successfully"))
.catch((e) => console.log("insertion failed, error: " + e.message));
