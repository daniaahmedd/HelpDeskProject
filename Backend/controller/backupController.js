const { exec } = require('child_process');
require('dotenv').config();
const backupController = {
  createBackup: async (req, res) => {
    try {
      // Execute the mongodump command
      exec('mongodump --gzip --uri="mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/"', (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          return res.status(500).json({ error: 'Backup failed' });
        }

        console.log('Backup completed successfully');
        res.status(200).json({ message: 'Backup created' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  restoreBackup: async (req, res) => {
    try {
      // Execute the mongorestore command
      exec('mongorestore --gzip --uri="mongodb+srv://Mariam:LW7ZrU0N8A25kWqB@cluster0.qebr03m.mongodb.net/"', (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          return res.status(500).json({ error: 'Restore failed' });
        }

        console.log('Restore completed successfully');
        res.status(200).json({ message: 'Restore completed' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = backupController;