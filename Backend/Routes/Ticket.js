const express = require("express");
const router = express.Router();
const workFlowController = require("../controller/workFlowController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.post("/api/ticket", authorizationMiddleware, TicketController.assignTicket);
router.put("/api/Ticket/:ticketid", authorizationMiddleware, TicketController.assignTicket);
router.post("/api/Ticket/rate/:ticketid", authorizationMiddleware, TicketController.assignTicket);
router.get
module.exports = router;