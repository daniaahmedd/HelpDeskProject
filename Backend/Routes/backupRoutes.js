const express = require('express');
const router = express.Router();
const backupController = require('../controller/backupController'); 
// POST /backup/create
router.post('/create', backupController.createBackup);

// POST /backup/restore
router.post('/restore', backupController.restoreBackup);

module.exports = router;