const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const TicketController = require("../controller/TicketController");


router.post("/", TicketController.createTicket);
router.put("/:ticketid", TicketController.updateTicket);
router.put("/rate/:ticketid", TicketController.rateTicket);
//router.get
module.exports = router;