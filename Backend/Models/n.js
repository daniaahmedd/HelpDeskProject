const mongoose = require('mongoose');
const Ticket = require('./ticketModel'); // Import the Ticket model with the defined schema
const objectId = mongoose.Types.ObjectId;
// Connect to MongoDB (replace the connection string with your MongoDB URL)
mongoose.connect('mongodb://127.0.0.1:27017/tickets', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));
 
// Assuming you have a user and agent in the database with existing IDs
const newTicket = new Ticket({
  ticketId:new objectId, // Generate a new ObjectId for ticketId
  status: 'Open',
  opendedtime: new Date(),
  closetime: new Date(),
  categories: 'Software',
  subcategories: 'Desktops',
  userid: '657b0d3bc5104f78355c54df', // Replace with a valid ObjectId for the user
  agentid: '657b0ae8bcf59cbe6d7554ee', // Replace with a valid ObjectId for the agent or leave null
  priorty: 'high',
  issueDescription: 'Issue description here',
  issueSolution: "jdfgjdfjgdflkgjl",
  rating: 5
  // ... Add other fields according to your schema
});
 
// Save the new ticket to the database
newTicket.save()
  .then(savedTicket => {
      console.log('Ticket saved:', savedTicket);
  })
  .catch(err => {
      console.error('Error saving ticket:', err);
  });