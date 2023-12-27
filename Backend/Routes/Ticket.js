const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const TicketController = require("../controller/TicketController");
//const ReportController = require('<path-to>/ReportController');

router.post("/create/:agentid",authorizationMiddleware(['Manager']), TicketController.createTicket);
router.post("/create", authorizationMiddleware(['Manager','User','Admin']),TicketController.createTicket);
router.put("/:ticketid",authorizationMiddleware(['Agent']) ,TicketController.updateTicket);
router.put("/rate/:ticketid",authorizationMiddleware(['User']), TicketController.rateTicket);
router.get("/gettickets",authorizationMiddleware(['Manager']),TicketController.gettickets)
module.exports = router;