const express = require("express");
const router = express.Router();
const CustomizationController = require("../controller/CustomizationController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");





// * create eCustomization
router.post("/styleCustomize", authorizationMiddleware(['admin']),CustomizationController.createCustomization);

//* Update Customization
router.put("/styleCustomize/edit", authorizationMiddleware(['admin']),CustomizationController.updateCustomization);

module.exports = router; 