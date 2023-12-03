const express = require("express");
const router = express.Router();
const workFlowController = require("../controller/workFlowController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.get("/api/workflow/view", authorizationMiddleware, workFlowController.getAllWorkFlow);
router.post("/api/workflow/assign", authorizationMiddleware, workFlowController.assignTicket);
router.get
module.exports = router;