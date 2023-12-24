const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const TicketController = require("../controller/TicketController");
//const ReportController = require('<path-to>/ReportController');
const workFlowController = require("../controller/workFlowController");

router.post("/create/:agentid", TicketController.createTicket);
router.post("/create", TicketController.createTicket);
router.put("/:ticketid", TicketController.updateTicket);
router.put("/rate/:ticketid", TicketController.rateTicket);
//router.get
module.exports = router;