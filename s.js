const mongoose = require('mongoose');
const knowledgeBase = require('D://GIU//Year 3//Semster 5//Software Project//HelpDeskProject//Backend//Models//knowledgeBase.js');
const objectId =new mongoose.Types.ObjectId();

mongoose.connect('mongodb://0.0.0.0:27017/Helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  // Create an instance of the modelnd set the data
  const newKnowledgeBase = new knowledgeBase({
    question_id: objectId,
    question: 'How do I connect to a wireless network?',
    solution: 'To connect to a wireless network, you...',
    question_category: 'Network',
    question_subcategory: 'Internet connection problems',
  });

  // Save the data to the database
  newKnowledgeBase.save()
    .then(() => {
      console.log('Data saved to the database');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    })
    .finally(() => {
      // Close the database connection
      mongoose.connection.close();
    });
})
.catch((error) => {
  console.error('Connection error:', error);
});