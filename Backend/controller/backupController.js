const { exec } = require('child_process');
require('dotenv').config();
const backupController = {
  createBackup: async (req, res) => {
    try {
      // Execute the mongodump command
      exec('mongodump --gzip --uri="mongodb://127.0.0.1:27017/LocalHelpDesk"', (error, stdout, stderr) => {
        if (error) {
          console.error(stderr);
          return res.status(500).json({ error: 'Backup failed' });
        }

        console.log('Backup completed successfully');
        console.log('Data will be Backed up every 24 hrs ;)');
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
      exec('mongorestore --gzip --uri="mongodb://127.0.0.1:27017/LocalHelpDesk"', (error, stdout, stderr) => {
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
cron.schedule('0 0 */24 * * *', () => {
  backupController.createBackup();
});
module.exports = backupController;