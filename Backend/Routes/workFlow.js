const express = require("express");
const router = express.Router();
const workFlowController = require("../controller/workFlowController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.get("/view", workFlowController.getAllWorkFlow);

module.exports = router;