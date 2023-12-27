const express = require('express');
const router = express.Router();
const backupController = require('../controller/backupController'); 
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

// POST /backup/create
router.post('/create',backupController.createBackup);

// POST /backup/restore
router.post('/restore', authorizationMiddleware(['Admin']) , backupController.restoreBackup);

module.exports = router;