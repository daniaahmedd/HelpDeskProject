const mongoose = require('mongoose');
const Ticket = require('D:/GIU/Year 3/Semster 5/Software Project/HelpDeskProject/Backend/Models/ticketModel.js'); // Import the Ticket model with the defined schema
const objectId = mongoose.Types.ObjectId;
// Connection URL to your MongoDB database
const MONGODB_URI = 'mongodb://127.0.0.1:27017/Helpdesk'; // Replace with your MongoDB URI
 
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Connected to MongoDB');

        // Create a new ticket instance
        const newTicket = new Ticket({
            status: 'Open',
            opendedtime: new Date(),
            closetime: new Date(),
            categories: 'Software',
            subcategories: 'Desktops',
            userid: "657b0cef7e55c5bd0fdac3e8", // Replace 'YourUserID' with a valid ObjectId for the user
            agentid: "5fecfbbacd1d81b818d99836", // Replace 'YourAgentID' with a valid ObjectId for the agent or leave null
            priorty: 'high',
            issueDescription: 'Issue description here',
            issueSolution: 'Issue solution here',
            rating: 4
            // ... Add other fields according to your schema
        });

        // Save the new ticket to the database
        try {
            const savedTicket = await newTicket.save();
            console.log('Ticket saved:', savedTicket);
        } catch (error) {
            console.error('Error saving ticket:', error);
        }
    })
    .catch(err => {
        console.error('Connection error:', err);
    });