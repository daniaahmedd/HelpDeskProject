const express = require("express");
const router = express.Router();
const workFlowController = require("../controller/workFlowController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.get("/view", workFlowController.getAllWorkFlow);
router.post("/api/workflow/assign", workFlowController.assignTicket);
//router.get
module.exports = router;