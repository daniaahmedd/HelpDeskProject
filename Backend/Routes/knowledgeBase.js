const express = require("express");
const router = express.Router();
const knowledgeBaseController = require("../controller/knowledgeBaseController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.get("/view", knowledgeBaseController.viewknowledgeBase);

module.exports = router;
