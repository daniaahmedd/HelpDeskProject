const express = require('express');
const router = express.Router();
const CustomizationController = require('../controller/CustomizationController');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');





// POST /customization/styleCustomize
router.post('/styleCustomize' ,authorizationMiddleware(['admin']),CustomizationController.createCustomization);

// PUT /customization/styleCustomize/edit
router.put('/styleCustomize/edit', authorizationMiddleware(['admin']),CustomizationController.updateCustomization);

router.get('/styleCustomize/find' ,authorizationMiddleware(['admin']),CustomizationController.getCustomization);

module.exports = router; 